import React, { Component } from "react";
import THREE from "three.js";

export default class Aircraft extends Component {
  renderer = null;
  scene = null;
  camera = null;
  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <div ref={wrapper => (this.wrapper = wrapper)} style={{ fontSize: 0 }} />
    );
  }
  createScene = _ => {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    const axes = new THREE.AxisHelper(200); //场景中添加一个三维坐标系，便于观察图形的位置
    scene.add(axes);

    const aspectRatio = WIDTH / HEIGHT; //宽高比设置为窗口大小，避免图案的变形
    const nearPlane = 0.1;
    const farPlane = 10000;
    const fieldOfView = 50;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    ); //使用一个透视相机使物体具有3d的效果

    camera.position.x = 0;
    camera.position.y = 200;
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setClearColor(0xeeeeee, 1.0);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true; // 阴影
    this.wrapper.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
  };
  init = _ => {
    this.createScene();
    this.loop();
  };
  loop = _ => {
    this.camera.position.x = Math.round(Math.random() * 200);
    this.camera.position.y = Math.round(Math.random() * 200);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.loop);
  };
}
