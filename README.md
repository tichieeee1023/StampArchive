# Yoojin Stamp Archive

여행지 풍경을 클릭해 우표를 모으고, 수집한 우표와 오늘 날짜 소인으로 세로형 엽서를 만드는 React 인터랙션입니다.

배포 화면: https://tichieeee1023.github.io/StampArchive/

## 로컬 실행

```sh
npm install
npm run dev
```

Node.js 22 이상을 권장합니다.

```sh
npm test
npm run build
npm run preview
```

## 사용법

- 상단에서 Paris, New York, Tokyo, Morocco, Seoul 풍경을 선택합니다.
- 풍경을 클릭하면 해당 위치가 우표 이미지에 반영되어 바닥에 쌓입니다.
- `쓱, 바닥 비우기`는 바닥에 쌓인 우표만 날려 보내고 Archive 수집품은 보존합니다.
- Archive에서 우표를 선택하면 엽서에 붙습니다. 체크박스로 여러 우표를 선택해 일괄 삭제할 수 있습니다.
- `IMAGE SHUFFLE`, `MESSAGE SHUFFLE`, `NEW CARD`로 엽서를 바꿉니다.
- 소인을 고른 뒤 `STAMP IT`을 누르면 우표 왼쪽 아래 모서리에 오늘 날짜 도장이 찍힙니다.
- `DOWNLOAD`는 완성된 엽서를 타임스탬프 파일명의 PNG로 저장합니다.

## GitHub Pages 배포

`main`에 push하면 GitHub Actions가 Vite를 빌드하고 Pages에 자동 배포합니다. 저장소 Settings → Pages에서 Source가 `GitHub Actions`인지 한 번 확인하세요.

## 기술 구조

- `src/App.jsx`: 여행지, 수집 우표, 엽서 상태와 상호작용
- `src/components/`: 풍경, 우표, Archive, 엽서 데스크, 소인 선택 UI
- `src/data/`: 여행지·엽서 이미지, 문구, 개별 소인 이미지
- `src/utils/`: 클릭 위치 크롭과 PNG 다운로드
- `src/styles.css`: 데스크톱·모바일 레이아웃과 애니메이션

외부 Unsplash 이미지를 사용하므로 배포 화면에서 인터넷 연결이 필요합니다. 수집 상태는 현재 브라우저 메모리에 저장되며 새로고침하면 초기화됩니다.
