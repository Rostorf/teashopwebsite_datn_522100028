import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import {toast} from 'react-toastify'

const ContactUs = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_8ve37cf", "template_fcu7d8n", form.current, "o73VOnR-_dYdMs63h").then(
      () => {
        toast.success('Gửi thành công!');
        form.current.reset()
      },
      (error) => {
        toast.error(`Lỗi ${error.text}`)
      }
    )
  }

  return (
    <div>
      <div className='form-wrapper mt-[5rem]'>
        <form ref={form} onSubmit={sendEmail} className='flex justify-center items-center flex-col gap-1'>
          <h2 className='font-semibold text-2xl my-2 text-center w-full'>Liên lạc chúng tôi</h2>

          <label className='font-semibold my-2'>Tên</label>
          <input className='border shadow-md w-[20rem] h-[3rem]' type="text" name='user_name' required  />

          <label className='font-semibold my-2'>Email</label>
          <input className='border shadow-md w-[20rem] h-[3rem]' type="email" name='user_email' required  />

          <label className='font-semibold my-2'>Số điện thoại</label>
          <input className='border shadow-md w-[20rem] h-[3rem]' type="subject" name='subject' required />

          <label className='font-semibold my-2'>Tin nhắn</label>
          <textarea className='border shadow-md w-[20rem] h-[3rem]' name="message" rows="4" required ></textarea>

          <button className='bg-blue-600 text-white cursor-pointer border shadow-md px-8 py-3 my-6'>
            <input type="submit" value="Gửi" />
          </button>
        </form>
        {/* <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1436.1705674848813!2d105.85415630831312!3d20.994040754170072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac12bfe0d817%3A0x33a7152bf93376b2!2sPhuong%20Dong%20University!5e0!3m2!1sen!2s!4v1773862222048!5m2!1sen!2s" width="400" height="300" style={{border: "0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div> */}
      </div>
    </div>
  )
}

export default ContactUs