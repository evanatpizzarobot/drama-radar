// DramaRadar Service Worker for Push Notifications

self.addEventListener("push", function (event) {
  if (!event.data) return;

  var data;
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: "DramaRadar", body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "DramaRadar", {
      body: data.body || "",
      icon: "/images/the-drama-desk-avatar.png",
      badge: "/favicon-32x32.png",
      data: { url: data.url || "https://dramaradar.com" },
      tag: data.tag || "dramaradar-alert",
      requireInteraction: false,
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
