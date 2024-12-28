uniform vec2 uRes;
uniform vec2 uImgRes;
uniform sampler2D uTexture;


varying vec2 vUv;
varying vec3 vPosition;


// vec2 CoverUV(vec2 uv, vec2 planeSize, vec2 imgSize) {
//   float planeAspectRatio = planeSize.x / planeSize.y;
//   float imgAspectRatio = imgSize.x / imgSize.y;

//   vec2 scale = planeAspectRatio < imgAspectRatio ? 
//   vec2(imgSize.x * planeSize.y / imgSize.y, planeSize.y) : 
//   vec2(planeSize.x, imgSize.y * planeSize.x / imgSize.x);

//   vec2 offset = (planeAspectRatio < imgAspectRatio ? 
//   vec2((scale.x - planeSize.x) / 2.0, 0.0) : 
//   vec2(0.0, (scale.y - planeSize.y) / 2.0)) / scale;

//   return uv * planeSize / scale + offset;
// }

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


void main(){
  vec4 img = texture2D(uTexture, CoverUV(vUv, uRes, uImgRes));
  gl_FragColor = vec4(vUv, 0.,1.);
  gl_FragColor = img;
}