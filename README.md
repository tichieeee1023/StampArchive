# Yoojin Stamp Archive

기존 `stamptest.html` 초안을 React + Vite로 옮긴 인터랙티브 우표 프로젝트입니다. HTML 원본은 비교용으로 유지했습니다.

## 실행

```sh
npm install
npm run dev
```

터미널에 표시된 localhost 주소로 접속합니다. Node.js 22.12 이상 권장.

```sh
npm test
npm run build
npm run preview
```

## 사용 흐름

1. 여행지를 선택하고 배경의 원하는 위치를 클릭해 우표를 수집합니다. 키보드로 배경 버튼을 실행하면 화면 중앙을 수집합니다.
2. 5개 이상 모으면 Archive 안내가 나타납니다. 오른쪽 ARCHIVE 버튼으로는 언제든 들어갈 수 있습니다.
3. 바닥의 `쓱, 바닥 비우기`는 쌓여 보이는 우표만 날려 보내며 Archive 수집품은 유지합니다.
4. Archive에서 우표를 클릭하면 엽서에 붙습니다. 체크박스와 전체 선택을 이용하면 수집품을 여러 개 삭제할 수 있습니다.
5. IMAGE SHUFFLE과 MESSAGE SHUFFLE로 이미지·글귀를 따로 바꾸거나, 입력창에 직접 글귀를 씁니다.
6. 소인을 선택하고 STAMP IT을 누릅니다. NEW CARD는 이미지와 덕담을 함께 새로 만듭니다.
7. DOWNLOAD로 완성한 엽서만 PNG로 저장합니다. 파일명에는 저장 시각이 들어갑니다.
8. 닫기 버튼이나 Escape로 풍경에 돌아갑니다.

## 구조

- `src/App.jsx`: 여행지, 수집 우표, 엽서와 소인 상태
- `src/components/`: TravelStage, PresetNav, Stamp, ArchiveDesk, StampCollection, PostcardDesk, PostmarkPicker
- `src/data/`: 초안에서 가져온 여행지·엽서 사진, 덕담, 소인
- `src/utils/getStampCrop.js`: 실제 cover 크기와 클릭 지점 기반 SVG 크롭
- `src/styles.css`: 초안의 타이포그래피와 색상을 유지한 스타일, 넓은 데스크와 모바일 레이아웃

사진은 HTML 초안의 Unsplash 외부 URL을 사용하므로 인터넷 연결이 필요합니다. 수집 데이터는 현재 React 메모리에 저장되어 새로고침하면 초기화됩니다. 이미지 끝을 클릭하면 사진 밖 영역은 우표의 종이색으로 표시되며, 클릭 지점은 중앙에 유지됩니다.
