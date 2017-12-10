// There is 2017 at the moment, and there is no support of common-js in GSAP
const tweenLite = require('gsap/TweenLite');
require('gsap/TimelineLite.js');
require('gsap/CSSPlugin');
require('gsap/ScrollToPlugin');
require('gsap/EasePack');

export const EaseBack = global.Back;
export const EasePower2 = global.Power2;
export const Timeline = global.TimelineLite;
export const Tween = tweenLite;
