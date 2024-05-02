import React, {useState, useEffect} from 'react';
import {SvgXml} from 'react-native-svg';

const CustomisedSvg = props => {
  const [imgXml, setImgXml] = useState('<svg></svg>');

  useEffect(() => {
    getImgXml();
  }, []);

  const getImgXml = async () => {
    const url = props?.svgUrl;
    const xml = await (await fetch(url)).text();
    setImgXml(xml);
  };

  return (
    <SvgXml
      xml={imgXml
        .replace(/fill="#[0-9a-f]{6}"/g, `fill="${props.fill}"`)
        .replace(/stroke="#[0-9a-f]{6}"/g, `stroke="${props.stroke}"`)}
      width={props?.width}
      height={props?.height}
      fill={'#fff'}
      {...props}
    />
  );
};

export const CustomisedSvg2 = props => {
  return <SvgXml xml={props.imgXml} {...props} />;
};

export default CustomisedSvg;
