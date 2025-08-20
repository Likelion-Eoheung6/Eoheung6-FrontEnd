import React from 'react';
import axios from 'axios';
import ClassContainer from '../../components/class/ClassContainer';
import BodyContainer from '../../components/common/BodyContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import ButtonComponent from '../../components/common/ButtonComponent';
import usePost from '../../hooks/usePost';
import { API } from '../../apis/axios';

export default function PaymentPage() {
  const { post, loading, error } = usePost();

  const state = {
    params: {
      orderId: 'unique_order_id',
      itemName: '초코파이',
      quantity: 1,
      totalPrice: 2200,
      customerEmail: 'dlwnstjr31@gmail.com',
      customerId: 'test1',
    },
  };

  const kakaoPayment = async () => {
    try {
      const response = await API.post('/kakao-pay/ready', state);
      const nextRedirectUrl = response.data.next_redirect_pc_url;
      console.log('Redirect URL:', nextRedirectUrl);
      window.location.href = nextRedirectUrl;
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  return (
    <ClassContainer>
      <ClassHeaderBar title="결제하기" />
      <BodyContainer>
        <div
          className={`w-full rounded-[1rem] box-border p-[12px]   shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]`}
        >
          <div className="flex flex-col">
            <span className="w-fit px-[14px] py-[6px] text-[14px] rounded-full font-semibold mb-[5px]">
              결제수단
            </span>
            <div className="flex gap-[27px]">
              <div className="rounded-[1.25rem] box-border p-[12px] border-[1px] ">
                카카오 페이
              </div>
              <div className="rounded-[1.25rem] box-border p-[12px] border-[1px] ">
                계좌이체
              </div>
            </div>
          </div>
        </div>
        <ButtonComponent text="결제하기" onClick={kakaoPayment} />
      </BodyContainer>
    </ClassContainer>
  );
}
