# lgulp
简单的gulp项目打包配置
# gulp-rev2的index.js修改

```
if (!file.isNull()) {
            var src = file.contents.toString('utf8');
            let dir = path.dirname(file.path);
            let assetReg = /(?:href=|src=)['|"]([^\s>"']+?)['|"]/g,
                res;
            while(res = assetReg.exec(src)){
                let absPath = path.join(dir, res[1]);
                let fileName =res[1].replace(/([\|\^\*\.\+\$\?\[\]\(\)\{\}])/g, '\\$1');
                if(manifest[absPath]){
                    let replaceUrl=path.join(path.dirname(res[1]),manifest[absPath]);
                    src = src.replace(new RegExp(fileName, 'g'), replaceUrl);
                }
            }
            file.contents = new Buffer(src);
        }
```
