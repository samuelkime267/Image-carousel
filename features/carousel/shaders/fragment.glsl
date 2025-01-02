uniform float uProgress;
uniform float uScale;
uniform vec2 uRes;
uniform vec2 uImgRes;
uniform sampler2D uTexture;


varying vec2 vUv;
varying vec3 vPosition;


vec2 CoverUV(vec2 uv, vec2 planeSize, vec2 imgSize) {
  float planeAspectRatio = planeSize.x / planeSize.y; // Aspect plane size
  float imgAspectRatio = imgSize.x / imgSize.y; // Aspect image size

  vec2 scale = planeAspectRatio < imgAspectRatio ? 
  vec2(imgSize.x * planeSize.y / imgSize.y, planeSize.y) : 
  vec2(planeSize.x, imgSize.y * planeSize.x / imgSize.x); // New scale

  vec2 offset = (planeAspectRatio < imgAspectRatio ? 
  vec2((scale.x - planeSize.x) / 2.0, 0.0) : 
  vec2(0.0, (scale.y - planeSize.y) / 2.0)) / scale; // offsetffset

  return uv * planeSize / scale + offset;
}

// Algorithm employed by photoshop to desaturate the input
vec4 desaturate(vec3 color) {
  float bw = (min(color.r, min(color.g, color.b)) + max(color.r, max(color.g, color.b))) * 0.5;
  return vec4(bw, bw, bw, 1.0);
}


void main(){
  vec2 scaledUv = (vUv - 0.5) * uScale + 0.5;
  vec2 coveredUV = CoverUV(scaledUv, uRes, uImgRes);

  vec4 img = texture2D(uTexture, coveredUV);
  vec4 desaturatedImg = desaturate(img.rgb);
  vec4 finalImg = mix(desaturatedImg, img, vec4(uProgress));
  gl_FragColor = img;
  gl_FragColor = desaturatedImg;
  gl_FragColor = finalImg;
  // gl_FragColor = vec4(coveredUV, 0.,1.);
}