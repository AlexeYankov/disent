import s from './loader.module.scss';

const Loader = () => {
  return (
    <div className={s.app__wrapper}>
      <div className={s.app__window}>
        <span className={s.loader}></span>
      </div>
    </div>
  );
};

export default Loader;