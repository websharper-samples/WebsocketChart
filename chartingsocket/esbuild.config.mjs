﻿import { cpSync, readdirSync } from 'fs'
import { build } from 'esbuild'

cpSync('./build/', './wwwroot/', { recursive: true });

const files = readdirSync('./build/Scripts/WebSharper/chartingsocket/');

files.forEach(file => {
  if (file.endsWith('.js')) {
    var options =
    {
      entryPoints: ['./build/Scripts/WebSharper/chartingsocket/' + file],
      bundle: true,
      minify: false,
      format: 'iife',
      outfile: './wwwroot/Scripts/WebSharper/' + file,
      globalName: 'wsbundle'
    };

    build(options);
  }
});
