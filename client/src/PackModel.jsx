import React from 'react';
// Find the latest version by visiting https://cdn.skypack.dev/three.
import * as THREE from 'three';
import oc from 'three-orbit-controls';

const OrbitControls = oc(THREE);

class PackModel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const existingCanvas = document.querySelector('canvas');
    if (existingCanvas) existingCanvas.remove();
  }

  componentWillUnmount() {
    const existingCanvas = document.querySelector('canvas');
    if (existingCanvas) existingCanvas.remove();
  }

  render() {
    const packDims = this.props.packDims;
    let items = this.props.packItems;
    items = items.map((item) => [
      [item.width, item.height, item.length],
      [0, 0, 0],
    ]);
    const scale = Math.max(...packDims);
    const normalPackDims = packDims.map((dim) => dim / scale);

    // const fitCameraToObject = function (camera, object, offset, controls) {
    //   offset = offset || 1.25;

    //   const boundingBox = new THREE.Box3();

    //   // get bounding box of object - this will be used to setup controls and camera
    //   boundingBox.setFromObject(object);

    //   const center = boundingBox.getCenter();

    //   const size = boundingBox.getSize();

    //   // get the max side of the bounding box (fits to width OR height as needed )
    //   const maxDim = Math.max(size.x, size.y, size.z);
    //   const fov = camera.fov * (Math.PI / 180);
    //   let cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2));

    //   cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    //   camera.position.z = cameraZ;

    //   const minZ = boundingBox.min.z;
    //   const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    //   camera.far = cameraToFarEdge * 3;
    //   camera.updateProjectionMatrix();

    //   if (controls) {
    //     // set camera to rotate around center of loaded object
    //     controls.target = center;

    //     // prevent camera from zooming out far enough to create far plane cutoff
    //     controls.maxDistance = cameraToFarEdge * 2;

    //     controls.saveState();
    //   } else {
    //     camera.lookAt(center);
    //   }
    // };
    function threeItUp(
      divSelector,
      packDims,
      itemArr,
      normalizationFactor = 1
    ) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true,
      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
      document.querySelector(divSelector).appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      const colorArray = (len) => {
        let arr = [];
        for (let i = 0; i < len; i++) {
          arr.push('#' + Math.floor(Math.random() * 16777215).toString(16));
        }
        return arr;
      };
      const colors = colorArray(20);

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
        edges.material.linewidth = 2;
        return [pack, edges];
      }

      function createItem(dims, position, colors) {
        const [len, width, height] = dims;
        const [x, y, z] = position;
        const geometry = new THREE.BoxGeometry(len, width, height);
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
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
      const [pack, edges] = createPack(normalizedPackDims, [0, 0, 0]);

      scene.add(pack);
      scene.add(edges);

      for (let item of itemArr) {
        let normalizedItemDims = [];
        normalizedItemDims.push(item[0][0] / normalizationFactor);
        normalizedItemDims.push(item[0][1] / normalizationFactor);
        normalizedItemDims.push(item[0][2] / normalizationFactor);
        let normalizedItemPos = [];
        normalizedItemPos.push(item[1][0] / normalizationFactor);
        normalizedItemPos.push(item[1][1] / normalizationFactor);
        normalizedItemPos.push(item[1][2] / normalizationFactor);
        let _item = createItem(normalizedItemDims, normalizedItemPos, colors);
        scene.add(_item);
      }

      camera.position.set(0, 0, scale * 2.5);

      controls.update();
      //   fitCameraToObject(camera, pack, 1, controls);

      const animate = () => {
        requestAnimationFrame(animate);

        controls.update();

        renderer.render(scene, camera);
      };

      animate();
    }

    threeItUp('body', packDims, items, 0.7);
    return null;
  }
}

export default PackModel;
