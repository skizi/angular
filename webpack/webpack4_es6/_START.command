#!/bin/sh
cd `dirname $0`
echo '=========================================================================='
echo ''
echo '　　　　　🤖　viewノローカル開発環境サーバヲ起動シマス!'
echo '　　　　　　　 - js コンパイルモシマス！'
echo '　　　　　　　 - scss コンパイルモシマス！'
echo ''
echo '=========================================================================='
yarn && npm run start
