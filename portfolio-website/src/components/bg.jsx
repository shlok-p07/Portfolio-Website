import LightRays from "./effect";

const Background = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FFFFFF"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center min-w-screen">
        {children}
      </div>
    </div>
  );
};

export default Background;
