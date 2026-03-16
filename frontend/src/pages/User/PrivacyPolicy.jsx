const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Chính Sách Bảo Mật Thông Tin</h1>
      <hr className="border-t-2 border-gray-300 w-64 mx-auto mb-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Mục đích thu thập thông tin</h2>
        <p>
          Chúng tôi thu thập thông tin cá nhân của bạn nhằm cung cấp và cải thiện dịch vụ, hỗ trợ khách hàng, gửi thông tin khuyến mãi và đảm bảo trải nghiệm người dùng tốt nhất.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Phạm vi thu thập</h2>
        <p>
          Thông tin có thể bao gồm: họ tên, email, số điện thoại, địa chỉ IP, thông tin thiết bị và hành vi sử dụng trên website/app của chúng tôi.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Thời gian lưu trữ</h2>
        <p>
          Thông tin của bạn sẽ được lưu trữ cho đến khi bạn yêu cầu xóa hoặc chúng tôi không còn cần sử dụng cho mục đích đã nêu.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Bảo mật thông tin</h2>
        <p>
          Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức để bảo mật thông tin cá nhân và ngăn chặn truy cập trái phép, mất mát hoặc tiết lộ.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Quyền của người dùng</h2>
        <p>
          Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào bằng cách liên hệ với chúng tôi qua email hoặc form liên hệ.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">6. Liên hệ</h2>
        <p>
          Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ qua email: <a className="text-blue-600 underline" href="mailto:contact@example.com">rostea@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
