#pragma once
#include <unordered_map>
#include <functional>

/**
 * @brief 패킷을 관리하는 매니저 클래스입니다.
 */
class PacketManager {
	public:
		PacketManager() = default;
		~PacketManager() = default;

		void Init(const int maxSessionCount);

		void Process(Poco::Int32 connectionIndex, const Poco::UInt16 packetID, char* pBuf, Poco::Int16 bodySize);

		void ProcessDevEcho(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);

		std::function<void(const int, const char*, const int)> SendPacketFunc;


	private:
		typedef void(PacketManager::* PROCESS_RECV_PACKET_FUNCTION)(Poco::Int32, char*, Poco::Int16);
		/**
		 * @brief 패킷 요청별 처리할 함수를 저장합나다.
		 */
		std::unordered_map<int, PROCESS_RECV_PACKET_FUNCTION> m_RecvFuntionDictionary;
};

