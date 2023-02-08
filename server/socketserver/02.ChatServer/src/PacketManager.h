#pragma once
#include <unordered_map>
#include <functional>

#include "UserManager.h"
#include "RoomManager.h"



	class PacketManager {
	public:
		PacketManager() = default;
		~PacketManager() = default;

		void Init(const int maxSessionCount);
		
		void Process(Poco::Int32 connectionIndex, const Poco::UInt16 packetID, char* pBuf, Poco::Int16 bodySize);
		
		void ProcessDevEcho(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);

		void ProcessDisConnected(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);

		void ProcessLogin(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		void ProcessEnterRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		void ProcessLeaveRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		void ProcessRoomChatMessage(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		

	
		std::function<void(const int, const char*, const int)> SendPacketFunc;


	private:
		typedef void(PacketManager::* PROCESS_RECV_PACKET_FUNCTION)(Poco::Int32, char*, Poco::Int16);
		std::unordered_map<int, PROCESS_RECV_PACKET_FUNCTION> m_RecvFuntionDictionary;

		UserManager mUserManager;
		RoomManager mRoomManager;
		
		
	};

