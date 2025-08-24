# Thực hiện bài test đánh giá năng lực Shub

## Giới thiệu tổng quan


### [Task 1: DATA REPORT](./task_1/README.md) (click vào để tới task 1)

**Yêu cầu:** Thiết kế  giao diện để người dùng thực hiện thao tác upload file và truy vấn (xử lý dữ liệu ở client)

**Chi tiết:**
- Trích xuất dữ liệu từ file báo cáo.  
- Cho phép người dùng nhập khoảng thời gian `<giờ bắt đầu> - <giờ kết thúc>`.  
- Tính toán **tổng thành tiền** trong khoảng thời gian đó.  
- Thiết kế giao diện để người dùng có thể upload file và truy vấn dữ liệu trực tiếp (xử lý dữ liệu ở phía client).  

---

### [Task 2: FORM](./task_2/README.md) (click vào để tới task 2)

**Mục tiêu:** Code giao diện (như hình minh hoạ) để **nhập giao dịch** cho cửa hàng xăng.

**Trường dữ liệu:**
- **Thời gian** (thời gian thực hiện giao dịch): *Datetime* – hiển thị **datetime picker** để chọn ngày giờ.
- **Số lượng** (số lít trong giao dịch): *number*.
- **Trụ** (số thứ tự trụ thực hiện giao dịch): *string* – hiển thị **select**.
- **Doanh thu** (thành tiền của giao dịch): *number*.
- **Đơn giá** (đơn giá của giao dịch): *number*.

**Yêu cầu:**
- Khi nhấn **“Cập nhật”**, tiến hành **validate tất cả trường** (bắt buộc, kiểu dữ liệu, giá trị hợp lệ, …).
- Hiển thị **thông báo lỗi / thành công** rõ ràng.
- **Khuyến khích** dùng thư viện validate (VD: Zod/Yup + React Hook Form) thay vì tự viết thủ công.

---

### [Task 3: DATABASE](./task_3/) (click vào để tới task 3)

Bạn được giao nhiệm vụ thiết kế **hệ CSDL** để quản lý hoạt động các trạm xăng: giao dịch mua bán, loại hàng hoá, trụ bơm, và các trạm xăng.

**Thiết kế dữ liệu (gợi ý các bảng):**
- **Trạm xăng**: thông tin các trạm.
- **Hàng hoá**: các loại xăng/dầu (A95, E5, DO, …).
- **Trụ bơm**: mỗi trạm có nhiều trụ bơm; mỗi trụ có thể phân phối nhiều loại hàng hoá.
- **Giao dịch**: lưu từng giao dịch, gồm ngày giờ, trạm, trụ, hàng hoá, số lít, đơn giá, thành tiền.

**Yêu cầu chức năng & ràng buộc:**
- Một **trạm xăng** có thể có **nhiều trụ bơm** và **bán nhiều loại hàng hoá**.
- Một **trụ bơm** có thể **cấp nhiều loại hàng**; giao dịch ghi kèm **trạm, trụ, hàng hoá** liên quan.
- Lưu trữ chi tiết **ngày giờ**, **hàng hoá**, **giá trị giao dịch**.
- Tự xác định **trường dữ liệu** phù hợp cho từng bảng.
- Đảm bảo **toàn vẹn dữ liệu** bằng **PRIMARY KEY**, **FOREIGN KEY** và **INDEX** hợp lý (phục vụ truy vấn theo ngày/tháng, theo trạm, trụ, hàng hoá).

**Truy vấn cần có:**
- Lấy **tất cả giao dịch** của **1 trạm** trong **khoảng ngày**.
- **Tổng doanh thu theo ngày** cho **1 trụ bơm**.
- **Tổng doanh thu theo ngày** cho **1 trạm**.
- **Top 3 hàng hoá bán chạy nhất** và **tổng số lít** tại **một trạm trong tháng**.

**Kết quả nộp:**
- File ảnh **ER Diagram** mô tả bảng & quan hệ.
- File **`.sql`** chứa **toàn bộ lệnh DDL** (tạo schema) và **các truy vấn** ở trên.

---
