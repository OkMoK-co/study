cmake_minimum_required(VERSION 3.5)

project(websocketserver LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Poco CONFIG REQUIRED Net XML Zip Data Util)

add_executable(websocketserver
	./src/main.cpp
	./src/PacketManager.cpp
)

target_link_libraries(websocketserver PRIVATE Poco::Net Poco::XML Poco::Zip Poco::Data Poco::Util)
