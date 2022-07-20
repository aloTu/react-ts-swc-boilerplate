import {FC, useState, useRef, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';

import CloseIcon from '@/assets/imgs/icons/close.svg';
import {useSize, useRequest} from 'ahooks';

import style from './index.module.less';

interface IRecommend {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

function App() {
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  const ref = useRef(null);
  const size = useSize(ref);

  const {data, error, loading} = useRequest(async () => {
    const result = await axios.get<IRecommend[]>('http://drive.kdocs.cn/api/v5/roaming/api/v1/recommended/list');
    return result.data;
  });
  useEffect(() => {
    size?.width && setPageSize(Math.min(~~(size?.width / 216), 4));
  }, [size?.width]);
  const totalPages = Math.ceil((data?.length || pageSize) / pageSize);
  return (
    <div className={style.wrap}>
      <div className={style.recommend}>
        <div className={style.title}>
          <div>功能推荐</div>
          <div className={style.btnRefresh} onClick={() => setCurPage((curPage + 1) % totalPages)}>
            换一批
          </div>
          <i className={style.btnClose}>
            <CloseIcon />
          </i>
        </div>
        <div className={style.template} ref={ref}>
          {data?.slice(curPage * pageSize, (curPage + 1) * pageSize).map((item, index) => (
            <Card data={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ICard {
  data: IRecommend;
}

const Card: FC<ICard> = ({data}) => {
  const {icon, title, subtitle} = data;
  return (
    <div className={style.cardWrap}>
      <img src={icon} alt={title} className={style.cardImg} />
      <div className={style.info}>
        <div className={style.name}>{title}</div>
        <div className={style.desc}>{subtitle}</div>
      </div>
    </div>
  );
};

export default App;
