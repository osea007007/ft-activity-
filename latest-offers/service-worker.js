/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
	'offline.html',
];
const CACHE_NAME = 'static-cache-v20200117-4';
const DATA_CACHE_NAME = 'data-cache-v20200117-4';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
	'/',
	'index.html',
	'css/style.css',
	'css/animate.css',
	'js/main.js',
	// 'js/app.js',
	'js/install.js',
	'js/jquery.min.js',
	'js/vue.js',
	'js/vue.min.js',
	'js/wow.min.js',
	'images/banner-man.png',
	'images/banner-bg.jpg',
	'images/banner-tit-1.png',
	'images/banner-tit-2.png',
	'images/banner-tit-3.png',
	'images/banner-tit-4.png',
	'images/banner-tit-5.png',
	'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
	'https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,700&display=swap',
];

self.addEventListener('install', (evt) => {
	console.log('[ServiceWorker] Install');
	// CODELAB: Precache static resources here.
	evt.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
		  console.log('[ServiceWorker] Pre-caching offline page');
		  return cache.addAll(FILES_TO_CACHE);
		})
	);

	self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
	console.log('[ServiceWorker] Activate');
	// CODELAB: Remove previous cached data from disk.
	evt.waitUntil(
		caches.keys().then((keyList) => {
		  return Promise.all(keyList.map((key) => {
			if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
			  console.log('[ServiceWorker] Removing old cache', key);
			  return caches.delete(key);
			}
		  }));
		})
	);

	self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
	console.log('[ServiceWorker] Fetch', evt.request.url);
	// CODELAB: Add fetch event handler here.
	if (evt.request.url.includes('/forecast/')) {
		console.log('[Service Worker] Fetch (data)', evt.request.url);
		evt.respondWith(
			caches.open(DATA_CACHE_NAME).then((cache) => {
				return fetch(evt.request)
					.then((response) => {
					// If the response was good, clone it and store it in the cache.
					if (response.status === 200) {
						cache.put(evt.request.url, response.clone());
					}
					return response;
					}).catch((err) => {
					// Network request failed, try to get it from the cache.
					return cache.match(evt.request);
					});
			}));
		return;
	}
	evt.respondWith(
		caches.open(CACHE_NAME).then((cache) => {
		return cache.match(evt.request)
			.then((response) => {
				return response || fetch(evt.request);
			});
		})
	);
});