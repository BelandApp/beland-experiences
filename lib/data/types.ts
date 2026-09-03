export type Publication = {
  id: string;
  name: string;
  video_url: string;
  image_url: string;
  likes: number;
  tags: string[];
  price: number;
  creator: string; //default Beland
  description: string;
  //prop hardcodeada a pedido de diego
  images_url?: string[];
};
