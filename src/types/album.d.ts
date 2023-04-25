type Album = {
  id?: string;
  albumName?: string;
  photoIds?: string;
  albumTitle?: string;
  albumSubTitle?: string;
  albumDesc?: string;
  remark?: string;
  uploaderId?: string;
  timeCreated?: number;
  photos?: Photo[];
  hideFlag?: string;
};

type Photo = {
  id?: string;
  name?: string;
  url?: string;
  originalName?: string;
  width?: string;
  height?: string;
  deleteFlag?: string;
  album?: string;
  remark?: string;
  uploaderId?: string;
  sortOrder?: number;
  timeCreated?: number;
  hideFlag?: string;
};
type AlbumVO = { album: Album; photos: Photo[] };
interface QueyAlbumParam extends Album {
  keyword?: string;
  start?: number;
  end?: number;
  pgNum: number;
  pgSize: number;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}
