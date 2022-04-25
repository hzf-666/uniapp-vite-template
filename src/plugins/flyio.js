/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-24 14:40:34
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-24 14:43:34
 */
import fly from '@a/flyio/fly';
import wxFly from '@a/flyio/wx';
import apFly from '@a/flyio/ap';

let Fly = fly;

/* #ifdef MP-WEIXIN */
Fly = wxFly;
/* #endif */

/* #ifdef MP-ALIPAY */
Fly = apFly;
/* #endif */

export default Fly;
