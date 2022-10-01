CREATE TABLE `user` (
  `id_user` int PRIMARY KEY,
  `nama` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `hp` varchar(255),
  `alamat` text
);

CREATE TABLE `acara` (
  `id_acara` int PRIMARY KEY,
  `nama_acara` varchar(255),
  `tanggal_mulai` date,
  `tanggal_akhir` date,
  `tempat` varchar(255),
  `latitude` varchar(255),
  `longitude` varchar(255),
  `deskripsi` text,
  `gambar` varchar(255)
);

CREATE TABLE `guest_star` (
  `id_guest_star` int PRIMARY KEY,
  `id_acara` int,
  `nama` varchar(255),
  `posisi` varchar(255),
  `deskripsi` text,
  `gambar` text
);

CREATE TABLE `jadwal` (
  `id_jadwal` int PRIMARY KEY,
  `id_acara` int,
  `judul` varchar(255),
  `deskripsi` varchar(255),
  `tanggal` date,
  `jam_mulai` time,
  `jam_akhir` time,
  `icon` varchar(255)
);

CREATE TABLE `paket` (
  `id_paket` int PRIMARY KEY,
  `id_acara` int,
  `nama_paket` varchar(255),
  `harga` double,
  `stok` int,
  `deskripsi` text,
  `gambar` varchar(255)
);

CREATE TABLE `paket_fasilitas` (
  `id_paket_fasilitas` int PRIMARY KEY,
  `id_paket` int,
  `nama` varchar(255),
  `deskripsi` varchar(255)
);

CREATE TABLE `order` (
  `id_order` int PRIMARY KEY,
  `id_user` int,
  `id_paket` int,
  `tanggal_order` datetime,
  `metode_pembayaran` varchar(255),
  `status_pembayaran` varchar(255)
);

CREATE TABLE `tiket` (
  `id_tiket` int PRIMARY KEY,
  `id_user` int,
  `id_order` int,
  `kode_tiket` int,
  `checkin` int,
  `tanggal_checkin` datetime
);

ALTER TABLE `order` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

ALTER TABLE `order` ADD FOREIGN KEY (`id_paket`) REFERENCES `paket` (`id_paket`);

ALTER TABLE `tiket` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

ALTER TABLE `tiket` ADD FOREIGN KEY (`id_order`) REFERENCES `order` (`id_order`);

ALTER TABLE `guest_star` ADD FOREIGN KEY (`id_acara`) REFERENCES `acara` (`id_acara`);

ALTER TABLE `jadwal` ADD FOREIGN KEY (`id_acara`) REFERENCES `acara` (`id_acara`);

ALTER TABLE `paket` ADD FOREIGN KEY (`id_acara`) REFERENCES `acara` (`id_acara`);

ALTER TABLE `paket_fasilitas` ADD FOREIGN KEY (`id_paket`) REFERENCES `paket` (`id_paket`);
