export const futuristicCarouselCode = `import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Environment, PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CarouselItemProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  index: number;
  isSelected: boolean;
  onClick: (index: number) => void;
  onHover: (index: number | null) => void;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ 
  position, 
  rotation, 
  color, 
  index, 
  isSelected, 
  onClick, 
  onHover 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
      
      // Gentle rotation
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.003;
      
      // Scale effect when selected or hovered
      const targetScale = isSelected ? 1.3 : hovered ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        onClick={() => onClick(index)}
        onPointerOver={() => {
          setHovered(true);
          onHover(index);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <MeshWobbleMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.9}
          factor={0.6}
          speed={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
        />
        
        {/* Inner glow sphere */}
        <mesh scale={0.8}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Outer shimmer ring */}
        <mesh scale={1.1}>
          <ringGeometry args={[0.9, 1.1, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </mesh>
    </Float>
  );
};

const CameraController: React.FC = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Smooth camera movement
    const time = state.clock.elapsedTime * 0.5;
    camera.position.x = Math.sin(time) * 2;
    camera.position.z = Math.cos(time) * 8 + 10;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const CarouselScene: React.FC<{
  items: Array<{ color: string; id: string; data?: any }>;
  onItemSelect: (index: number, item: any) => void;
}> = ({ items, onItemSelect }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Auto-rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Generate positions in a circle
  const radius = 6;
  const itemPositions = items.map((_, index) => {
    const angle = (index / items.length) * Math.PI * 2;
    return [
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ] as [number, number, number];
  });

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
    onItemSelect(index, items[index]);
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={60} />
      <CameraController />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} color="#4f46e5" />
      
      {/* Key light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#06b6d4"
        castShadow
      />
      
      {/* Fill light */}
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.5}
        color="#ec4899"
      />
      
      {/* Rim light */}
      <pointLight
        position={[0, 15, 0]}
        intensity={0.8}
        color="#8b5cf6"
        distance={30}
      />

      <group ref={groupRef}>
        {items.map((item, index) => (
          <CarouselItem
            key={item.id}
            position={itemPositions[index]}
            rotation={[0, 0, 0]}
            color={item.color}
            index={index}
            isSelected={selectedIndex === index}
            onClick={handleItemClick}
            onHover={setHoveredIndex}
          />
        ))}
      </group>

      {/* Environment for reflections */}
      <Environment preset="city" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0f0f23', 15, 25]} />
      
      {/* Background gradient plane */}
      <mesh position={[0, 0, -15]} scale={[50, 50, 1]}>
        <planeGeometry />
        <meshBasicMaterial>
          <primitive
            object={
              new THREE.ShaderMaterial({
                uniforms: {
                  time: { value: 0 }
                },
                vertexShader: \`
                  varying vec2 vUv;
                  void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                \`,
                fragmentShader: \`
                  uniform float time;
                  varying vec2 vUv;
                  void main() {
                    vec2 uv = vUv;
                    vec3 color1 = vec3(0.1, 0.05, 0.2);
                    vec3 color2 = vec3(0.2, 0.1, 0.4);
                    vec3 color3 = vec3(0.05, 0.1, 0.3);
                    
                    float noise = sin(uv.x * 3.0 + time * 0.5) * sin(uv.y * 2.0 + time * 0.3);
                    vec3 finalColor = mix(mix(color1, color2, uv.y), color3, noise * 0.1);
                    
                    gl_FragColor = vec4(finalColor, 1.0);
                  }
                \`
              })
            }
          />
        </meshBasicMaterial>
      </mesh>
    </>
  );
};

interface FuturisticCarouselProps {
  items?: Array<{ color: string; id: string; data?: any }>;
  onItemSelect?: (index: number, item: any) => void;
  className?: string;
}

const FuturisticCarousel: React.FC<FuturisticCarouselProps> = ({
  items = [
    { color: '#06b6d4', id: 'cyan', data: { name: 'Cyan Sphere' } },
    { color: '#8b5cf6', id: 'purple', data: { name: 'Purple Sphere' } },
    { color: '#ec4899', id: 'pink', data: { name: 'Pink Sphere' } },
    { color: '#10b981', id: 'emerald', data: { name: 'Emerald Sphere' } },
    { color: '#f59e0b', id: 'amber', data: { name: 'Amber Sphere' } },
    { color: '#ef4444', id: 'red', data: { name: 'Red Sphere' } },
  ],
  onItemSelect = (index, item) => console.log('Selected:', index, item),
  className = ''
}) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemSelect = (index: number, item: any) => {
    setSelectedItem(item);
    onItemSelect(index, item);
  };

  return (
    <div className={\`relative w-full h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 \${className}\`}>
      {/* Canvas container */}
      <Canvas
        shadows
        className="w-full h-full"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <CarouselScene items={items} onItemSelect={handleItemSelect} />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10">
        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Futuristic Carousel
          </h2>
          <p className="text-cyan-300 text-sm mb-4">
            Click on any sphere to interact
          </p>
          {selectedItem && (
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-3 border border-cyan-400/30">
              <p className="text-white font-medium">Selected:</p>
              <p className="text-cyan-300">{selectedItem.data?.name || 'Unknown Item'}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-white text-sm max-w-xs">
          <p className="mb-2">🎮 <strong>Controls:</strong></p>
          <p className="text-gray-300">• Click spheres to select</p>
          <p className="text-gray-300">• Hover for preview</p>
          <p className="text-gray-300">• Auto-rotating view</p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default FuturisticCarousel;`;