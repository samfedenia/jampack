import React from 'react';

// Find the latest version by visiting https://cdn.skypack.dev/three.
import * as THREE from 'three';
import oc from 'three-orbit-controls';

const OrbitControls = oc(THREE);

class PackModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: new THREE.WebGLRenderer({
        alpha: false,
        antialias: true,
      }),
    };
  }

  componentWillUnmount() {
    const existingCanvas = document.querySelector('canvas');
    if (existingCanvas) {
      console.log('diposed and cleared three.js canvas');
      this.state.renderer.renderLists.dispose();
      this.state.renderer.clear();
      existingCanvas.remove();
    }
  }

  render() {
    const renderer = this.state.renderer;
    const packDims = this.props.packDims;
    const colors = this.props.colors;
    let items = this.props.packItems;

    const scale = Math.max(...packDims);

    function threeItUp(
      divSelector,
      packDims,
      itemArr,
      normalizationFactor = 1,
      colors
    ) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      //   const renderer = new THREE.WebGLRenderer({
      //     alpha: false,
      //     antialias: true,
      //   });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
      document.querySelector(divSelector).appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      // const colorArray = (len) => {
      //   let arr = [];
      //   for (let i = 0; i < len; i++) {
      //     arr.push('#' + Math.floor(Math.random() * 16777215).toString(16));
      //   }
      //   return arr;
      // };
      // const colors = colorArray(20);

      function createPack(dims, position, color = '#836953') {
        const [len, width, height] = dims;
        const [x, y, z] = position;
        const geometry = new THREE.BoxGeometry(len, width, height);
        const material = new THREE.MeshBasicMaterial({
          color,
          opacity: 0.7,
          transparent: true,
        });
        const pack = new THREE.Mesh(geometry, material);
        pack.position.x = x;
        pack.position.y = y;
        pack.position.z = z;

        const edges = new THREE.EdgesHelper(pack, 'black');
        edges.position.x = x;
        edges.position.y = y;
        edges.position.z = z;
        edges.material.linewidth = 2;
        return [pack, edges];
      }

      function createItem(dims, position, color) {
        const [len, width, height] = dims;
        const [x, y, z] = position;
        const geometry = new THREE.BoxGeometry(len, width, height);
        const material = new THREE.MeshBasicMaterial({
          // color: colors[Math.floor(Math.random() * colors.length)],
          color,
        });

        const box = new THREE.Mesh(geometry, material);
        box.position.x = x;
        box.position.y = y;
        box.position.z = z;
        return box;
      }

      let normalizedPackDims = [];
      normalizedPackDims.push(packDims[0] / normalizationFactor);
      normalizedPackDims.push(packDims[1] / normalizationFactor);
      normalizedPackDims.push(packDims[2] / normalizationFactor);
      const [pack, edges] = createPack(normalizedPackDims, [
        normalizedPackDims[0] / 2,
        normalizedPackDims[1] / 2,
        normalizedPackDims[2] / 2,
      ]);

      scene.add(pack);
      scene.add(edges);
      let idx = 0;
      for (let item of itemArr) {
        let normalizedItemDims = [];
        normalizedItemDims.push(item[0][0] / normalizationFactor);
        normalizedItemDims.push(item[0][1] / normalizationFactor);
        normalizedItemDims.push(item[0][2] / normalizationFactor);
        let normalizedItemPos = [];
        normalizedItemPos.push(item[1][0] / normalizationFactor);
        normalizedItemPos.push(item[1][1] / normalizationFactor);
        normalizedItemPos.push(item[1][2] / normalizationFactor);
        let _item = createItem(
          normalizedItemDims,
          normalizedItemPos,
          colors[idx]
        );
        idx++;
        scene.add(_item);
      }

      camera.position.set(packDims[0] * 3, packDims[1] * 3, packDims[2] * 3);

      controls.update();

      const animate = () => {
        requestAnimationFrame(animate);

        controls.update();

        renderer.render(scene, camera);
      };

      animate();
    }

    threeItUp('body', packDims, items, 0.7, colors);
    return null;
  }
}

export default PackModel;
