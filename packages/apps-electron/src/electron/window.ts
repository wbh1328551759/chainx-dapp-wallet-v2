// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BrowserWindow, screen, shell } from 'electron';
import path from 'path';
import axios from 'axios';

export function createWindow(environment: string): Promise<unknown> {
  const {height, width} = screen.getPrimaryDisplay().workAreaSize;
  const packageJson = require('../../../../package.json');

  const win = new BrowserWindow({
    height,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    },
    width
  });
  if (environment === 'development') {
    win.webContents.openDevTools();

    return win.loadURL('http://127.0.0.1:3000/');
  }



  async function getRelease() {
    const {data} = await axios.get('https://api.github.com/repos/chainx-org/chainx-dapp-wallet-v2/releases/latest');
    const fileNameList: string[] = await data.assets.map((file: any) => file.name);
    const fileNameToDownload: string | string[] = await fileNameList.filter((fileName: string) => fileName.indexOf('.exe') !== -1 && fileName.indexOf('.blockmap') === -1);
    const fileToDownload = await data.assets.find((file: any) => file.name === fileNameToDownload[0]);
    const latestVersion = data.tag_name.slice(1)
    if (packageJson.version !== latestVersion) {

      require('electron')
        .dialog
        .showMessageBox(win, {
          title: '温馨提示',
          message: `您访问的版本不是最新版本哦，如果可以，请使用我们的最新版本，点击下方按钮进入下载页面：`,
          buttons: ['mac 下载入口', 'windows 下载入口']
        }).then((index) => {
        if (index.response === 0) {
          shell.openExternal('http://www.baidu.com');
        } else if (index.response === 1) {
          shell.openExternal(fileToDownload['browser_download_url']);
        }
      });
    }
  }

  getRelease();


  const mainFilePath = path.resolve(__dirname, 'index.html');

  return win.loadFile(mainFilePath);
}
