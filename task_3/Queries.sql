-- Các giao dịch trong 1 ngày --
SELECT gd."MaGiaoDich", gd."NgayGiaoDich", gd."GioGiaoDich",
       gd."Quantity", gd."DonGia",
       ROUND(gd."Quantity" * gd."DonGia", 2) AS "ThanhTien",
       gd."TrangThai", nv."TenNhanVien", kh."TenKhachHang",
       tx."TenTramXang",
       tb."TenTruBom", tx."TenTramXang"
FROM "GiaoDich" gd
JOIN "TruBom" tb ON gd."MaTruBom" = tb."MaTruBom"
JOIN "TramXang" tx ON tb."MaTramXang" = tx."MaTramXang"
LEFT JOIN "NhanVien" nv ON gd."MaNhanVien" = nv."MaNhanVien"
LEFT JOIN "KhachHang" kh ON gd."MaKhachHang" = kh."MaKhachHang"
WHERE tx."MaTramXang" = 1
  AND gd."NgayGiaoDich" BETWEEN DATE '2025-08-24' AND DATE '2025-08-24'
ORDER BY gd."NgayGiaoDich", gd."GioGiaoDich";

-- Tổng doanh thu theo ngày cho 1 trụ bơm
SELECT tb."TenTruBom" AS "Tên trụ bơm", SUM(ROUND(gd."DonGia"*gd."Quantity",2)) AS "Tổng tiền", gd."NgayGiaoDich" AS "Ngày giao dịch"
FROM "GiaoDich" gd
JOIN "TruBom" tb ON gd."MaTruBom" = tb."MaTruBom"
-- Nếu muốn lấy trong ngày hôm nay thì bỏ comment bên dưới giúp em ạ
-- WHERE gd."NgayGiaoDich" = CURRENT_DATE
GROUP BY tb."TenTruBom", gd."NgayGiaoDich"
ORDER BY gd."NgayGiaoDich"

-- Tổng doanh thu theo ngày cho 1 trạm
SELECT tx."TenTramXang" AS "Tên Trạm Xăng", SUM(ROUND(gd."DonGia"*gd."Quantity",2)) AS "Doanh thu", gd."NgayGiaoDich" AS "Ngày giao dịch"
FROM "GiaoDich" gd
JOIN "TruBom" tb ON gd."MaTruBom" = tb."MaTruBom"
JOIN "TramXang" tx ON tb."MaTramXang" = tx."MaTramXang"
-- Nếu muốn lấy trong ngày hôm nay thì bỏ comment bên dưới giúp em ạ
-- WHERE gd."NgayGiaoDich" = CURRENT_DATE
GROUP BY tx."TenTramXang", gd."NgayGiaoDich"
ORDER BY gd."NgayGiaoDich" DESC

-- Lấy top 3 hàng hoá bán chạy nhất và tổng lít tại một trạm trong tháng
SELECT 
    hh."TenHangHoa" AS "Tên hàng hoá",
    TO_CHAR(gd."NgayGiaoDich", 'YYYY-MM') AS "Tháng",
    SUM(gd."Quantity") AS "Tổng số lít"
FROM "GiaoDich" gd
JOIN "TruBom" tb ON gd."MaTruBom" = tb."MaTruBom"
JOIN "HangHoa" hh ON tb."MaHangHoa" = hh."MaHangHoa"
JOIN "TramXang" tx ON tb."MaTramXang" = tx."MaTramXang"
-- Nhập mã trạm bên dưới
WHERE tx."MaTramXang" = 1
  AND DATE_TRUNC('month', gd."NgayGiaoDich") = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY hh."TenHangHoa", "Tháng"
ORDER BY "Tên hàng hoá" ASC
LIMIT 3;

