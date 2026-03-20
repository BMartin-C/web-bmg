/**
 * ModelViewer.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A self-contained Three.js 3D viewer that renders inside a bordered container.
 * Designed for low-poly models displayed with flat / faceted shading.
 *
 * FEATURES
 * ─────────
 *  • Orbit controls  — click-drag to rotate, scroll to zoom, right-drag to pan.
 *  • Auto-rotate     — slowly spins when the user is not interacting.
 *  • Responsive      — resizes with its container via ResizeObserver.
 *  • Low-poly style  — flat shading, no smoothing, minimal lighting.
 *
 * HOW TO LOAD A REAL MODEL
 * ─────────────────────────
 * The viewer currently shows a built-in placeholder geometry (low-poly sphere).
 * To load your own .glb / .gltf file:
 *
 *   1. Drop the file in /public/models/  (e.g. /public/models/my-model.glb).
 *   2. In the `loadModel` function below, uncomment the GLTFLoader block
 *      and set the `modelPath` prop when using <ModelViewer>.
 *   3. The placeholder geometry will be replaced once the file loads.
 *
 * To load a .obj file instead, swap GLTFLoader for OBJLoader:
 *   import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
 *
 * Props
 * ─────
 *   modelPath  {string}  – (optional) path to a .glb/.gltf file under /public/.
 *                          When omitted, the built-in placeholder is shown.
 *   label      {string}  – text label shown below the viewer container.
 *   height     {number}  – container height in pixels (default: 380).
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// Uncomment to enable GLTF loading:
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import '../styles/model-viewer.css'

// ─── Scene constants ──────────────────────────────────────────────────────────

/** Background colour of the 3D canvas — matches the page's cream palette. */
const BG_COLOR = 0xf0ebe0

/** Colour of the main model mesh (low-poly flat shading). */
const MESH_COLOR = 0x4a235a   // deep purple — matches Project 2 deco theme

/** Colour of the wireframe overlay drawn on top of the mesh. */
const WIRE_COLOR = 0x2a1030

/** Point light colour and intensity. */
const LIGHT_COLOR  = 0xffffff
const LIGHT_INTENSITY = 3

/** How many faces the placeholder icosahedron has (detail level 0–4). */
const PLACEHOLDER_DETAIL = 1   // 1 = low-poly; increase for smoother shapes

// ─── ModelViewer ──────────────────────────────────────────────────────────────

export default function ModelViewer({ modelPath, label, height = 380 }) {
  /** Ref attached to the <div> that will contain the Three.js <canvas>. */
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(BG_COLOR)
    container.appendChild(renderer.domElement)

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()

    // ── Camera ────────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      45,                                           // field of view (degrees)
      container.clientWidth / container.clientHeight, // aspect ratio
      0.1,                                          // near clip
      100,                                          // far clip
    )
    camera.position.set(0, 1.2, 4)

    // ── Lighting ──────────────────────────────────────────────────────────────
    // Ambient light gives a base brightness to all surfaces.
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    // Point light from the upper-right, casting directional variation.
    const pointLight = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY, 20)
    pointLight.position.set(4, 6, 4)
    scene.add(pointLight)

    // Soft fill light from below to prevent completely black undersides.
    const fillLight = new THREE.PointLight(0x9999cc, 0.6, 20)
    fillLight.position.set(-3, -2, -3)
    scene.add(fillLight)

    // ── Orbit controls ────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping  = true    // smooth deceleration after release
    controls.dampingFactor  = 0.07
    controls.autoRotate     = true    // slow spin when idle
    controls.autoRotateSpeed = 1.2
    controls.enablePan      = false   // disable pan for simpler UX
    controls.minDistance    = 1.5
    controls.maxDistance    = 10

    // ── Model loading ─────────────────────────────────────────────────────────

    /**
     * buildPlaceholder
     * Creates a low-poly icosahedron with a wireframe overlay.
     * This runs immediately and is replaced if a real model is loaded.
     * The flat shading (flatShading: true) gives each face a solid colour
     * with no interpolation — the defining look of low-poly art.
     */
    function buildPlaceholder() {
      const group = new THREE.Group()

      // Solid mesh — flat shaded so each triangular face is a distinct colour
      const geo = new THREE.IcosahedronGeometry(1, PLACEHOLDER_DETAIL)
      const mat = new THREE.MeshPhongMaterial({
        color:       MESH_COLOR,
        flatShading: true,       // key to the low-poly look
        shininess:   30,
      })
      const mesh = new THREE.Mesh(geo, mat)
      group.add(mesh)

      // Wireframe overlay — reveals the polygon topology
      const wireMat = new THREE.MeshBasicMaterial({
        color:     WIRE_COLOR,
        wireframe: true,
        opacity:   0.18,
        transparent: true,
      })
      const wire = new THREE.Mesh(geo, wireMat)
      group.add(wire)

      return group
    }

    /**
     * loadModel
     * Loads a real GLTF/GLB file when `modelPath` is provided.
     * Falls back to the placeholder while loading (or on error).
     *
     * TO ENABLE:
     *   1. Uncomment the GLTFLoader import at the top of this file.
     *   2. Uncomment the block below.
     *   3. Pass modelPath="/models/your-file.glb" to <ModelViewer>.
     */
    let model = buildPlaceholder()
    scene.add(model)

    /*
    // ── GLTF loader (uncomment to use) ────────────────────────────────────
    if (modelPath) {
      const loader = new GLTFLoader()
      loader.load(
        modelPath,
        (gltf) => {
          // Remove placeholder, add loaded model
          scene.remove(model)
          model = gltf.scene

          // Apply flat shading to every mesh in the loaded model
          model.traverse(child => {
            if (child.isMesh) {
              child.material = new THREE.MeshPhongMaterial({
                color: child.material.color ?? MESH_COLOR,
                flatShading: true,
                shininess: 30,
              })
            }
          })

          // Centre and normalise scale so the model fits the view
          const box    = new THREE.Box3().setFromObject(model)
          const size   = box.getSize(new THREE.Vector3())
          const centre = box.getCenter(new THREE.Vector3())
          const scale  = 2 / Math.max(size.x, size.y, size.z)
          model.scale.setScalar(scale)
          model.position.sub(centre.multiplyScalar(scale))

          scene.add(model)
        },
        undefined,           // onProgress (optional)
        (err) => console.error('GLTFLoader error:', err),
      )
    }
    */

    // ── Resize handling ───────────────────────────────────────────────────────
    // ResizeObserver fires whenever the container's size changes (e.g. window
    // resize, sidebar toggle) and updates the renderer and camera accordingly.
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    resizeObserver.observe(container)

    // ── Animation loop ────────────────────────────────────────────────────────
    let animationId
    function animate() {
      animationId = requestAnimationFrame(animate)
      controls.update()          // required for damping + auto-rotate
      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    // React calls this when the component unmounts.  We must dispose of all
    // Three.js resources to avoid memory leaks and GPU resource exhaustion.
    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
      controls.dispose()
      renderer.dispose()
      // Remove the canvas from the DOM
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [modelPath]) // re-run if the model path changes

  return (
    <div className="model-viewer-wrap">
      {/* The Three.js canvas is injected into this div by the useEffect above */}
      <div
        ref={containerRef}
        className="model-viewer-canvas"
        style={{ height }}
      />

      {/* Optional label below the viewer */}
      {label && (
        <div className="model-viewer-label">
          <span>{label}</span>
        </div>
      )}
    </div>
  )
}
