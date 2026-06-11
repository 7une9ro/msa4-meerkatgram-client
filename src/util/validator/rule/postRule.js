export const content = (val) => {
  if (!val)
    return '본문은 필수입니다.';

  return '';
};

export const image = (val) => {
  if (!val) {
    return '프로필은 필수입니다.';
  }

  return '';
}