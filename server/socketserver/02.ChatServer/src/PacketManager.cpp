#include <utility>
#include <cstring>

#include "Packet.h"
#include "PacketManager.h"



	void PacketManager::Init(const int maxSessionCount)
	{
		mUserManager.Init(maxSessionCount);

		mRoomManager.SendPacketFunc = SendPacketFunc;
		mRoomManager.Init(0, 100, 4);


		m_RecvFuntionDictionary = std::unordered_map<int, PROCESS_RECV_PACKET_FUNCTION>();

		m_RecvFuntionDictionary[(int)PACKET_ID::DEV_ECHO] = &PacketManager::ProcessDevEcho;

		m_RecvFuntionDictionary[(int)PACKET_ID::INTERNAL_CLOSE] = &PacketManager::ProcessDisConnected;

		m_RecvFuntionDictionary[(int)PACKET_ID::LOGIN_REQUEST] = &PacketManager::ProcessLogin;		
		m_RecvFuntionDictionary[(int)PACKET_ID::ROOM_ENTER_REQUEST] = &PacketManager::ProcessEnterRoom;
		m_RecvFuntionDictionary[(int)PACKET_ID::ROOM_LEAVE_REQUEST] = &PacketManager::ProcessLeaveRoom;
		m_RecvFuntionDictionary[(int)PACKET_ID::ROOM_CHAT_REQUEST] = &PacketManager::ProcessRoomChatMessage;				
	}



	void PacketManager::Process(const Poco::Int32 connectionIndex, const Poco::UInt16 packetID, char* pBodyData, Poco::Int16 bodySize)
	{
		auto iter = m_RecvFuntionDictionary.find(packetID);
		if (iter != m_RecvFuntionDictionary.end())
		{
			(this->*(iter->second))(connectionIndex, pBodyData, bodySize);
		}

	}
		
	void PacketManager::ProcessDevEcho(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
	{
		auto packetID = (Poco::UInt16)PACKET_ID::DEV_ECHO;
		auto packetSize = (Poco::UInt16)(bodySize + sizeof(PACKET_HEADER));
		char echoData[1024] = { 0, };

		memcpy(&echoData, (char*)&packetSize, 2);
		memcpy(&echoData[2], (char*)&packetID, 2);
		memcpy(&echoData[5], pBodyData, bodySize);

		SendPacketFunc(connIndex, echoData, packetSize);
	}

	void PacketManager::ProcessDisConnected(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
	{
		auto pUser = mUserManager.GetUserByConnIdx(connIndex);
		if (pUser == nullptr)
		{
			return;
		}

		if (pUser->IsCurInRoom())
		{
			mRoomManager.LeaveUser(pUser->GetCurrentRoomIndex(), pUser);
		}

		mUserManager.RemoveUserInfo(pUser);
	}

	void PacketManager::ProcessLogin(const Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
	{ 		
		auto pLoginReqPacket = reinterpret_cast<LOGIN_REQUEST_PACKET*>(pBodyData);

		auto pUserID = pLoginReqPacket->UserID;
		printf("requested user id = %s\n", pUserID);

		LOGIN_RESPONSE_PACKET loginResPacket;
		loginResPacket.PacketID = (Poco::UInt16)PACKET_ID::LOGIN_RESPONSE;
		loginResPacket.PacketSize = sizeof(LOGIN_RESPONSE_PACKET);

		if (mUserManager.GetCurrentUserCnt() >= mUserManager.GetMaxUserCnt())
		{ 
			//�����ڼ��� �ִ���� �����ؼ� ���ӺҰ�
			loginResPacket.Result = (Poco::UInt16)ERROR_CODE::LOGIN_USER_USED_ALL_OBJ;
			SendPacketFunc(connIndex, (char*)&loginResPacket, sizeof(LOGIN_RESPONSE_PACKET));
			return;
		}

		//���⿡�� �̹� ���ӵ� �������� Ȯ���ϰ�, ���ӵ� ������� �����Ѵ�.
		if (mUserManager.FindUserIndexByID(pUserID) == -1)
		{ 
			//�������� �ƴ� �������
			//������ �����ϴ� ��ü�� �ִ´�.
			mUserManager.AddUser(pUserID, connIndex);
			loginResPacket.Result = (Poco::UInt16)ERROR_CODE::NONE;
		}
		else 
		{
			//�������� �������� ���и� ��ȯ�Ѵ�.
			loginResPacket.Result = (Poco::UInt16)ERROR_CODE::LOGIN_USER_ALREADY;
			SendPacketFunc(connIndex, (char*)&loginResPacket, sizeof(LOGIN_RESPONSE_PACKET));
			return;
		}

		SendPacketFunc(connIndex, (char*)&loginResPacket, sizeof(LOGIN_RESPONSE_PACKET));
	}



	void PacketManager::ProcessEnterRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
	{
		//UNREFERENCED_PARAMETER(bodySize);

		auto pRoomEnterReqPacket = reinterpret_cast<ROOM_ENTER_REQUEST_PACKET*>(pBodyData);
		auto pReqUser = mUserManager.GetUserByConnIdx(connIndex);

		if (!pReqUser || pReqUser == nullptr) 
		{
			return;
		}
		
		//TODO �濡 �ִ� �������� ������ �� �������� ������ ���ο� ���� �������� �˸���

		//TODO �濡 ������ �־��ٸ� �� �������� ���� ���� ���� ������ �˸���

		ROOM_ENTER_RESPONSE_PACKET roomEnterResPacket;
		roomEnterResPacket.PacketID = (Poco::UInt16)PACKET_ID::ROOM_ENTER_RESPONSE;
		roomEnterResPacket.PacketSize = sizeof(ROOM_ENTER_RESPONSE_PACKET);
				
		roomEnterResPacket.Result = mRoomManager.EnterUser(pRoomEnterReqPacket->RoomNumber, pReqUser);

		SendPacketFunc(connIndex, (char*)&roomEnterResPacket, sizeof(ROOM_ENTER_RESPONSE_PACKET));
	}


	void PacketManager::ProcessLeaveRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 copySize)
	{
		//UNREFERENCED_PARAMETER(pBodyData);
		//UNREFERENCED_PARAMETER(copySize);

		ROOM_LEAVE_RESPONSE_PACKET roomLeaveResPacket;
		roomLeaveResPacket.PacketID = (Poco::UInt16)PACKET_ID::ROOM_LEAVE_RESPONSE;
		roomLeaveResPacket.PacketSize = sizeof(ROOM_LEAVE_RESPONSE_PACKET);

		auto reqUser = mUserManager.GetUserByConnIdx(connIndex);
		auto roomNum = reqUser->GetCurrentRoomIndex();
				
		roomLeaveResPacket.Result = mRoomManager.LeaveUser(roomNum, reqUser);
		
		SendPacketFunc(connIndex, (char*)&roomLeaveResPacket, sizeof(ROOM_LEAVE_RESPONSE_PACKET));
	}


	void PacketManager::ProcessRoomChatMessage(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
	{
		//UNREFERENCED_PARAMETER(bodySize);

		auto pRoomChatReqPacketet = reinterpret_cast<ROOM_CHAT_REQUEST_PACKET*>(pBodyData);
		
		ROOM_CHAT_RESPONSE_PACKET roomChatResPacket;
		roomChatResPacket.PacketID = (Poco::UInt16)PACKET_ID::ROOM_CHAT_RESPONSE;
		roomChatResPacket.PacketSize = sizeof(ROOM_CHAT_RESPONSE_PACKET);
		roomChatResPacket.Result = (Poco::Int16)ERROR_CODE::NONE;

		auto reqUser = mUserManager.GetUserByConnIdx(connIndex);
		auto roomNum = reqUser->GetCurrentRoomIndex();
				
		auto pRoom = mRoomManager.GetRoomByNumber(roomNum);
		if (pRoom == nullptr)
		{
			roomChatResPacket.Result = (Poco::Int16)ERROR_CODE::CHAT_ROOM_INVALID_ROOM_NUMBER;
			SendPacketFunc(connIndex, (char*)&roomChatResPacket, sizeof(ROOM_CHAT_RESPONSE_PACKET));
			return;
		}
				
		pRoom->NotifyChat(connIndex, reqUser->GetUserId().c_str(), pRoomChatReqPacketet->Message);		
	}		   




