const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Điều Khoản Sử Dụng</h1>
      <hr className="border-t-2 border-gray-300 w-64 mx-auto mb-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Chấp nhận điều khoản</h2>
        <p>
          Bằng cách truy cập và sử dụng website/dịch vụ của chúng tôi, bạn đồng ý bị ràng buộc bởi các điều khoản và điều kiện được quy định tại đây. Nếu bạn không đồng ý, vui lòng không sử dụng dịch vụ.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Thay đổi điều khoản</h2>
        <p>
          Chúng tôi có thể cập nhật hoặc điều chỉnh điều khoản này bất kỳ lúc nào mà không cần thông báo trước. Phiên bản cập nhật sẽ có hiệu lực kể từ thời điểm được đăng tải trên website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Quyền và trách nhiệm của người dùng</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Không được sử dụng dịch vụ cho mục đích bất hợp pháp hoặc vi phạm đạo đức xã hội.</li>
          <li>Không can thiệp, gây gián đoạn hoặc phá hoại hệ thống, dữ liệu hoặc dịch vụ.</li>
          <li>Chịu trách nhiệm về nội dung bạn tạo hoặc chia sẻ qua nền tảng của chúng tôi.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Quyền sở hữu trí tuệ</h2>
        <p>
          Tất cả nội dung, hình ảnh, thiết kế và mã nguồn trên website này thuộc quyền sở hữu của chúng tôi hoặc được cấp phép hợp pháp. Nghiêm cấm sao chép, phân phối hoặc sử dụng lại mà không có sự cho phép bằng văn bản.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Miễn trừ trách nhiệm</h2>
        <p>
          Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh do việc sử dụng hoặc không thể sử dụng dịch vụ, bao gồm nhưng không giới hạn lỗi hệ thống, mất dữ liệu, hoặc hành vi của bên thứ ba.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">6. Liên hệ</h2>
        <p>
          Nếu bạn có câu hỏi về Điều khoản sử dụng, vui lòng liên hệ: <a href="mailto:legal@example.com" className="text-blue-600 underline">rostea@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

export default Terms;
