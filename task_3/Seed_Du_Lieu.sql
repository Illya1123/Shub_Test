CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Thêm trạm xăng
INSERT INTO "TramXang" ("TenTramXang", "DiaChi", "SDT")
VALUES 
('Cửa hàng xăng dầu số 27', '123 Đường quốc lộ 1 Thủ Đức', '0815123456'),
('Cửa hàng xăng dầu số 28', '456 Xa lộ Hà Nội, TP HCM', '0815456789');

-- Thêm hàng hóa
INSERT INTO "HangHoa" ("TenHangHoa", "GiaCoBan")
VALUES
('Xăng Ron A95', 24280),
('Dầu DO 0,05', 21010);

-- Thêm trụ bơm
INSERT INTO "TruBom" ("MaTramXang", "MaHangHoa", "TenTruBom")
VALUES
(1, 1, 'Trụ 05 - Xăng Ron A95'),
(1, 1, 'Trụ 09 - Xăng Ron A95'),
(1, 1, 'Trụ 02 - Xăng Ron A95'),
(1, 1, 'Trụ 01 - Xăng Ron A95'),
(1, 2, 'Trụ 03 - Dầu DO 0,05'),
(2, 1, 'Trụ 11 - Xăng Ron A95'),
(2, 1, 'Trụ 12 - Xăng Ron A95'),
(2, 2, 'Trụ 13 - Dầu DO 0,05');

-- Thêm nhân viên
INSERT INTO "NhanVien" ("MaNhanVien", "TenNhanVien")
VALUES
(gen_random_uuid(), 'Nhân viên A'),
(gen_random_uuid(), 'Nhân viên B'),
(gen_random_uuid(), 'Nhân viên C'),
(gen_random_uuid(), 'Nhân viên D');

-- Thêm khách hàng
INSERT INTO "KhachHang" ("MaKhachHang", "TenKhachHang", "LoaiKhachHang")
VALUES
(gen_random_uuid(), 'Khách lẻ', 'Khách lẻ'),
(gen_random_uuid(), 'CTY TNHH MTV DỊCH VỤ VẬN TẢI PHÚC BÌNH AN', 'Khách công nợ'),
(gen_random_uuid(), 'CTY TNHH Vận tải Minh Phát', 'Khách công nợ');

-- Thêm giao dịch
INSERT INTO "GiaoDich" 
("MaTruBom", "Quantity", "MaNhanVien", "TrangThai", "MaKhachHang", "BienSoXe")
VALUES
(1, 3.29,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Tiền mặt',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang"='Khách lẻ'),
 NULL),

(2, 2.48,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Tiền mặt',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang"='Khách lẻ'),
 NULL),

(2, 2.47,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Tiền mặt',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang"='Khách lẻ'),
 NULL),

(2, 2.05,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Tiền mặt',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang"='Khách lẻ'),
 NULL),

(5, 250.00,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Chờ chuyển khoản',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang" LIKE 'CTY%' LIMIT 1),
 '62B-99999'),

(3, 7.00,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Tiền mặt',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang"='Khách lẻ'),
 NULL),

(2, 2.05,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Tiền mặt',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang"='Khách lẻ'),
 NULL),

(6, 5.20,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Tiền mặt',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang"='Khách lẻ'),
 NULL),

(7, 3.15,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Tiền mặt',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang"='Khách lẻ'),
 NULL),

(8, 120.00,
 (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
 'Chờ chuyển khoản',
 (SELECT "MaKhachHang" FROM "KhachHang" WHERE "TenKhachHang" LIKE 'CTY TNHH Vận tải Minh Phát' LIMIT 1),
 '62C-88888');


-- Giao dịch cách đây 2 ngày
INSERT INTO "GiaoDich" 
("MaTruBom", "Quantity", "DonGia", "NgayGiaoDich", "GioGiaoDich", "MaNhanVien", "TrangThai", "BienSoXe")
VALUES
(
  (SELECT "MaTruBom" FROM "TruBom" ORDER BY RANDOM() LIMIT 1),
  45.50,
  23890,
  CURRENT_DATE - INTERVAL '2 days',
  CURRENT_TIME,
  (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
  'Chờ chuyển khoản',
  '62B-88888'
);

-- Giao dịch cách đây 5 ngày
INSERT INTO "GiaoDich" 
("MaTruBom", "Quantity", "DonGia", "NgayGiaoDich", "GioGiaoDich", "MaNhanVien", "TrangThai", "BienSoXe")
VALUES
(
  (SELECT "MaTruBom" FROM "TruBom" ORDER BY RANDOM() LIMIT 1),
  32.75,
  23950,
  CURRENT_DATE - INTERVAL '5 days',
  CURRENT_TIME,
  (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
  'Tiền mặt',
  '30A-12345'
);

-- Giao dịch cách đây 10 ngày
INSERT INTO "GiaoDich" 
("MaTruBom", "Quantity", "DonGia", "NgayGiaoDich", "GioGiaoDich", "MaNhanVien", "TrangThai", "BienSoXe")
VALUES
(
  (SELECT "MaTruBom" FROM "TruBom" ORDER BY RANDOM() LIMIT 1),
  60.10,
  24000,
  CURRENT_DATE - INTERVAL '10 days',
  CURRENT_TIME,
  (SELECT "MaNhanVien" FROM "NhanVien" ORDER BY RANDOM() LIMIT 1),
  'Đã chuyển khoản',
  '51F-77777'
);
