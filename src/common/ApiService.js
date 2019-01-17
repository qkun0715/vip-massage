// const BASE_URL = "http://www.wisehealth.com.cn/vip/";
const BASE_URL = "http://192.168.100.11:8088/vip/";
const URL = {
  imageURL: "http://192.168.100.11:8088/team/IoReadImage?path=",
  getInfoByOpenid: BASE_URL + "user/getInfoByOpenid", //根据openid 获取用户信息
  getGroups: BASE_URL + "group/listToApp", //获取集团数据
  getSubbranch: BASE_URL + "subbranch/listToApp", //获取分店数据
  getSubbranchService: BASE_URL + "subbranchService/listToApp", //获取分店数据
  getEffectivePoint: BASE_URL + "point/getEffectivePoint", //可用积分
  getLevel: BASE_URL + "level/listToApp",//等级规则
  getSelectedCount:BASE_URL+"schedule/selectedCount",//获取多少人预约了此项目
  getTechnicianList:BASE_URL+"massagist/listNoPage",//获取技师列表
  getTimeBucket:BASE_URL+"timetable/listByDateAndMaster",//根据技师和选中日期获取已预约的时间段
};

module.exports = URL;
