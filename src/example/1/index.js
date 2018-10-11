import React, { Component } from "react";
import THREE from "three.js";

export default class App extends Component {
  componentDidMount() {
    this.init();
  }
  render() {
    return <div ref={wrapper => (this.wrapper = wrapper)} />;
  }
  init = _ => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1.5, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    window.camera = camera;
    window.scene = scene;
    window.renderer = renderer;

    renderer.setClearColor(0xeeeeee, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true; // 阴影

    // 坐标轴
    const axes = new THREE.AxisHelper(20);
    scene.add(axes);

    // 平面
    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true; // 接受阴影
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    // 球
    const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x7777ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true; // 开启阴影
    sphere.position.x = 0;
    sphere.position.y = 2;
    sphere.position.z = 0;
    scene.add(sphere);

    // 灯光
    const light = new THREE.SpotLight(0xffffff);
    light.position.set(-40, 60, -10);
    light.castShadow = true; // 开启阴影
    scene.add(light);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    this.wrapper.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  };
}
