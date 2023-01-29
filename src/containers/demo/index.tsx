import React, { useEffect, useState } from "react";
import "./demo.less";
interface Iprops {}

const Demo = React.memo(function Demo(props: Iprops) {
  return <div className="container">hello</div>;
});

export default Demo;
