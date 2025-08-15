<!-- TOC -->
- [请确保代码可以编译通过再合并到master分支](#请确保代码可以编译通过再合并到master分支)
    - [开发分支](#开发分支)
    - [远程调试](#远程调试)
- [vue端pte-ui版本升级](#vue端pte-ui版本升级)
- [vue端打包到服务器](#vue端打包到服务器)
- [工作流页面改造](#工作流页面改造)
    - [用户新增页面适配工作流改造](#用户新增页面适配工作流改造)
- [国际化问题](#国际化问题)
    - [菜单国际化](#菜单国际化后台维护表ctp_language_packet)
    - [静态下拉国际化](#静态下拉国际化后台维护dict_language_packet)
    - [其他国际化](#其他国际化vue维护需要国际化的页面不用做额外的修改直接在国际化文件public\i18ns\en\enjson及public\i18ns\zh-cn\enjson修改即可)
    - [国际化注意事项](#注意)

<!-- /TOC -->

#### 开发分支：
+ develope（开发）、sit（测试）、master（生产）都无推送权限，只有合并权限
+ 所有的提交分支都需要从master分支切出
+ 具体流程如下
+ git checkout -b feature-a orgin master  基于master切出feature-a分支
+ 开发完成后 将feature-a分支合入develop分支，自测试通过合入sit分支，待测试人员测试通过后合入master分支投产，生产验证通过后才能在gitlab上删除feature-a分支

#### 基本命令
+ 安装依赖 ：npm i
+ 指定私服安装依赖 ： npm i --registry http://e-proxy.yfb.sunline.cn/nexus3/repository/npm-sunline/
+ 运行 : npm run dev
+ 打包 : npm run compile:deploy

#### 远程调试：
+ 修改src\proxy.json文件可以用vue端进行远程调试，注意请不要将修改后的文件提交到gitlab中，建议在本地忽略该文件

### vue端pte-ui版本升级
+ npm update pte-ui --save --registry http://10.182.200.98:8081/nexus/content/groups/npm-all/
+ 不生效的情况下可以先移除pte-ui再指定版本安装
+ npm remove pte-ui
+ npm i pte-ui@2.0.10 --save --registry http://10.182.200.98:8081/nexus/content/groups/npm-all/  // 从指定镜像库安装2.0.10版本的pte-ui
+ 最粗暴升级方式(不推荐)，删除本地node_modules目录,修改package.json中pte-ui版本配置，重新npm i --registry http://10.182.200.98:8081/nexus/content/groups/npm-all/

### vue端打包到服务器
1. 将代码合并到master分支，确保master分支和自己的分支代码一致之后准备打包。
2. 在项目根目录下执行 npm run compile:deploy 命令，vue就会将所有资源打包到deploy文件夹
3. 将根目录下的deploy文件夹替换tomcat下的webapps/icore-sump/deploy文件夹
4. 部署后一般不需要重启tomcat,如果页面不生效，可以尝试重启tomcat来解决，重启tomcat建议直接kill进程然后重新启动，不要使用tomcat的shutdown命令。

### 国际化问题

#### 菜单国际化：后台维护：表ctp_language_packet

#### 静态下拉国际化：后台维护：表 dict_language_packet(**现国际化由内管统一维护，开发人员无需关心。**)

#### 其他国际化：vue维护，**现国际化由内管统一维护，开发人员无需关心**。

### 注意事项
+ 页面表格中 字段拼接已key-value形式展示 显示"Invalid date" 问题
+ 字典下拉 使用 "format": "label" 也能展示，或使用下面这种方式
+ 动态查询返回结果，只能使用："value": "${{current.展示的值vule}}-${{current.展示的值lable}}",如我想展示角色ID-角色名称（ "value": "${{current.role_id}}-${{current.role_name}}"）
+ 现table已经支持宽度自适应，如果表格列中有width属性，或者表格中添加columnDefaultWidth属性，是以这两个属性为准的。请各模块页面开发人员对页面进行调整。去掉table列的自定义宽度设置，改用自适应宽度
