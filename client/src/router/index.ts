import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/courses',
		name: 'Courses',
		component: () => import('../views/Courses.vue'),
	},
	{
		path: '/faculty',
		name: 'Faculty',
		component: () => import('../views/Faculty.vue'),
	},
	{
		path: '/yearbook',
		name: 'Yearbook',
		component: () => import('../views/Yearbook.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
