import Icon from '@ant-design/icons';
import { BookTwoTone, CustomerServiceTwoTone, SmileTwoTone } from '@ant-design/icons';

const FemaleSvg = () => (
  <svg width="4em" height="4em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M712.8 548.8c53.6-53.6 83.2-125 83.2-200.8 0-75.9-29.5-147.2-83.2-200.8C659.2 93.6 587.8 64 512 64s-147.2 29.5-200.8 83.2C257.6 200.9 228 272.1 228 348c0 63.8 20.9 124.4 59.4 173.9 7.3 9.4 15.2 18.3 23.7 26.9 8.5 8.5 17.5 16.4 26.8 23.7 39.6 30.8 86.3 50.4 136.1 57V736H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h114v140c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V812h114c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H550V629.5c61.5-8.2 118.2-36.1 162.8-80.7zM512 556c-55.6 0-107.7-21.6-147.1-60.9C325.6 455.8 304 403.6 304 348s21.6-107.7 60.9-147.1C404.2 161.5 456.4 140 512 140s107.7 21.6 147.1 60.9C698.4 240.2 720 292.4 720 348s-21.6 107.7-60.9 147.1C619.7 534.4 567.6 556 512 556z"></path>
  </svg>
);

const MaleSvg = () => (
  <svg width="4em" height="4em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M895.547475 98.133333H585.50303c-16.678788 0-30.125253 13.446465-30.125252 30.125253s13.446465 30.125253 30.125252 30.125252h238.286869L680.662626 301.511111c-63.870707-54.30303-144.161616-84.040404-228.977778-84.040404-94.513131 0-183.466667 36.719192-250.311111 103.692929C134.4 388.137374 97.680808 476.961616 97.680808 571.474747s36.719192 183.337374 103.692929 250.311112 155.79798 103.692929 250.311111 103.692929 183.337374-36.719192 250.311112-103.692929c66.844444-66.973737 103.692929-155.79798 103.692929-250.311112 0-84.169697-29.090909-163.684848-82.618182-227.296969l142.351515-142.351515V438.30303c0 16.678788 13.446465 30.125253 30.125253 30.125253s30.125253-13.446465 30.125252-30.125253V128.258586c0-16.678788-13.575758-30.125253-30.125252-30.125253zM451.684848 865.228283C289.680808 865.228283 157.931313 733.478788 157.931313 571.474747s131.749495-293.753535 293.753535-293.753535c79.90303 0 152.307071 32.064646 205.187879 83.911111 0.905051 1.163636 1.810101 2.327273 2.844445 3.232323 1.034343 1.034343 2.19798 1.939394 3.10303 2.715152 50.941414 52.880808 82.488889 124.767677 82.488889 203.894949 0.129293 162.00404-131.749495 293.753535-293.624243 293.753536z m0 0"></path>
  </svg>
);

export const FemaleIcon = (props: any) => <Icon component={FemaleSvg} {...props} />;
export const MaleIcon = (props: any) => <Icon component={MaleSvg} {...props} />;

export function GenderIcon(props: any) {
  const gender = props.gender.toString();
  if (gender === '???') {
    return (
      <p>
        <MaleIcon style={{ color: '#69c0ff' }} />
      </p>
    );
  }
  if (gender === '???') {
    return (
      <p>
        <FemaleIcon style={{ color: 'hotpink' }} />
      </p>
    );
  }
  return (
    <p>
      <FemaleIcon style={{ color: 'grey' }} />
    </p>
  );
}

export const iconStyle = {
  fontSize: '50px',
};

export function StatusIcon(props: any) {
  const status = Number(props.status.toString());
  if (status === 0) {
    return (
      <p>
        <BookTwoTone style={iconStyle} twoToneColor="#95de64" />
      </p>
    );
  }
  if (status === 1) {
    return (
      <p>
        <CustomerServiceTwoTone style={iconStyle} twoToneColor="#95de64" />
      </p>
    );
  }
  if (status === 2) {
    return (
      <p>
        <SmileTwoTone style={iconStyle} twoToneColor="#95de64" />
      </p>
    );
  }
  return <p></p>;
}
