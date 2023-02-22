/**
 * @file main.cpp
 * @date 2023-02-22
 * @author donghyuk
 * @brief 서버의 시작 지점입니다.
 */

#include "MultiplexedServer.hpp"

/**
 * @brief 서버의 포트 번호입니다.
 */
const Poco::UInt16 PORT = 8080;

/**
 * @brief 서버가 허용할 최대 클라이언트 수 입니다.
 */
const int MAX_CONNECT_COUNT = 256;

/**
 * @brief 프로그램의 시작 지점입니다.
 * @return 프로그램의 실행 결과값입니다.
 */
int main ()
{
	MultiplexedServer server;

	server.Init(MAX_CONNECT_COUNT);
	server.Start(PORT);

	return 0;
}

