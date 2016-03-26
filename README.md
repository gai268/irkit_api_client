# irkit_api_gui

http://a-tagai.github.io/irkit_api_client/

##メモ書き
[React](https://facebook.github.io/react/ "React")を使用してるので、
改修には少し開発環境の準備が必要。
```
cd irkit_api_gui/
#npm install --global babel-cli
npm install
```
下記のコマンドで、jsxファイルをコンパイル。
```
babel --presets react src --watch --out-dir build
```
