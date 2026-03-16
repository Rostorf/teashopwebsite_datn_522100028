const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Chính Sách Giao Hàng</h1>
      <hr className="border-t-2 border-gray-300 w-64 mx-auto mb-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Phạm vi giao hàng</h2>
        <p>
          Chúng tôi cung cấp dịch vụ giao hàng trên toàn quốc. Một số khu vực ngoại thành hoặc vùng sâu vùng xa có thể cần thời gian giao hàng lâu hơn hoặc tính phí phụ thu.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Thời gian xử lý và giao hàng</h2>
        <p>
          Đơn hàng sẽ được xử lý trong vòng <strong>24–48 giờ</strong> (trong giờ hành chính). Thời gian giao hàng thông thường từ <strong>2–7 ngày làm việc</strong> tùy theo địa chỉ nhận hàng.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Phí vận chuyển</h2>
        <p>
          - Miễn phí vận chuyển với đơn hàng từ <strong>500.000đ</strong> trở lên.<br />
          - Đơn hàng dưới mức miễn phí sẽ tính phí theo bảng giá của đơn vị vận chuyển, được hiển thị khi thanh toán.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Kiểm tra và nhận hàng</h2>
        <p>
          Quý khách có quyền kiểm tra ngoại quan sản phẩm trước khi thanh toán. Nếu phát hiện hàng hóa bị móp méo, rách bao bì, xin vui lòng từ chối nhận hàng và liên hệ với chúng tôi để được hỗ trợ.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Chậm trễ giao hàng</h2>
        <p>
          Trong một số trường hợp bất khả kháng (thiên tai, dịch bệnh, hoặc sự cố ngoài ý muốn), thời gian giao hàng có thể bị kéo dài. Chúng tôi sẽ chủ động liên hệ để thông báo và hỗ trợ kịp thời.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">6. Liên hệ hỗ trợ</h2>
        <p>
          Mọi thắc mắc về đơn hàng hoặc vận chuyển, xin vui lòng liên hệ với chúng tôi qua email: <a className="text-blue-600 underline" href="mailto:support@example.com">rostea@gmail.com</a> hoặc hotline: <strong>1900 1234</strong>.
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;
