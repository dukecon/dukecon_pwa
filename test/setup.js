import { expect as chaiExpect } from 'chai';
import sinon from 'sinon';
import Vue from 'vue';
import VueRouter from 'vue-router'
import Eventbus from '@/Eventbus.js';

Vue.use(Eventbus);
Vue.use(VueRouter);

global.sinon = sinon;
global.chaiExpect = chaiExpect;
console.info = jest.fn();