'use client';

import Link from 'next/link';
import { Inter } from '@next/font/google';
import Component from '@/components/Component';

import styles from '@/styles/home.module.scss';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface roomType {
  number: number;
  limit: number;
  full: number;
  player1: string;
  player2: string;
}

export default function Home() {
  const [rooms, setRooms] = useState<roomType[]>([]);

  //arraybuffer 합치기
  let _appendBuffer = function (buffer1: any, buffer2: any) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp.buffer;
  };

  useEffect(() => {
    console.log('rooms', rooms);
  }, [rooms]);

  useEffect(() => {
    const ws = new WebSocket('ws://10.19.231.208:8080');

    ws.binaryType = 'arraybuffer';
    ws.addEventListener('open', function open() {
      console.log('WebSocket connection opened');

      const HEADER_SIZE = 5;
      const ECHO_DEV = 181;

      let encoder = new TextEncoder();
      // let msg = encoder.encode('echoo');

      var buffer = new ArrayBuffer(HEADER_SIZE + 23 + 23);

      var dataview = new DataView(buffer);

      // packet header
      dataview.setInt16(2, ECHO_DEV, true);
      dataview.setInt8(4, 0);

      // packet body
      dataview.setInt32(HEADER_SIZE, 1);
      dataview.setInt16(HEADER_SIZE + 4, 30);
      dataview.setInt8(HEADER_SIZE + 6, 1);

      let player1 = encoder.encode('jabae');
      let player2 = encoder.encode('daekimee');

      let arr8 = new Uint8Array(buffer);
      for (var i = 0; i < 8; i++) {
        if (player1[i]) arr8[HEADER_SIZE + 7 + i] = player1[i];
        else arr8[HEADER_SIZE + 7 + i] = 0;
      }
      for (var i = 0; i < 8; i++) {
        if (player2[i]) arr8[HEADER_SIZE + 15 + i] = player2[i];
        else arr8[HEADER_SIZE + 15 + i] = 0;
      }

      // packet body
      dataview.setInt32(HEADER_SIZE + 23, 2);
      dataview.setInt16(HEADER_SIZE + 4 + 23, 35);
      dataview.setInt8(HEADER_SIZE + 6 + 23, 1);

      player1 = encoder.encode('jiyo');
      player2 = encoder.encode('donghyuk');

      for (var i = 0; i < 8; i++) {
        if (player1[i]) arr8[HEADER_SIZE + 7 + 23 + i] = player1[i];
        else arr8[HEADER_SIZE + 7 + 23 + i] = 0;
      }
      for (var i = 0; i < 8; i++) {
        if (player2[i]) arr8[HEADER_SIZE + 15 + 23 + i] = player2[i];
        else arr8[HEADER_SIZE + 15 + 23 + i] = 0;
      }

      dataview.setInt16(0, HEADER_SIZE + 23 + 23, true);

      // 데이터 보기
      ws.send(dataview);
    });

    ws.addEventListener('message', function incoming(event) {
      // 성공여부에 따른 분기처리
      const view = new DataView(event.data);
      // console.log('Received message:', event.data);
      let packetLength = view.getInt16(0, true);
      let packetId = view.getInt16(2, true);
      let packetOption = view.getInt8(4);

      if ((packetId & 0x8000) === 0x8000)
        console.log('응답 실패'); // 응답 실패 코드로 빠지도록 하쟈!
      else {
        const decoder = new TextDecoder();
        let arr = [];
        for (let i = 0; i < (event.data.byteLength - 5) / 23; i++) {
          let tmp = {
            number: view.getInt32(5 + i * 23),
            limit: view.getInt16(9 + i * 23),
            full: view.getInt8(11 + i * 23),
            player1: decoder.decode(new Uint8Array(event.data, 12 + i * 23, 8)),
            player2: decoder.decode(new Uint8Array(event.data, 20 + i * 23, 8)),
          };
          arr.push(tmp);
        }
        setRooms(rooms.concat(arr));
      }
    });
  }, []);

  return (
    <>
      <div className={styles.main}>메인입니다.</div>
      {rooms.map((e) => {
        return (
          <>
            <div>{e.number}</div>
            <div>{e.limit}</div>
            <div>{e.full}</div>
            <div>{e.player1}</div>
            <div>{e.player2}</div>
          </>
        );
      })}
      <Link href='/profile'>프로필로 가기</Link>

      <Component />
    </>
  );
}
