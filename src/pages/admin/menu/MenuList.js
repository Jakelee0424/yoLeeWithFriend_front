import styles from "style/menu.module.css";
import { Tree } from "react-arborist";
import { useEffect, useState, useRef } from "react";
import * as menuMngService from "service/admin/menu/menuMngService";

let idCounter = 1000;

const MenuList = () => {
  const [treeData, setTreeData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [deletedIdList, setDeletedIdList] = useState(new Set());
  const selectedNodeRef = useRef(null);
  const originalDataRef = useRef([]);

  const selectedData = selectedNodeRef.current?.data;

  useEffect(() => {
    const closeContextMenu = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener("click", closeContextMenu);
    }
    return () => document.removeEventListener("click", closeContextMenu);
  }, [contextMenu]);

  useEffect(() => {
    getTreeMenuList();
  }, []);

  const getTreeMenuList = async () => {
    const result = await menuMngService.fetcherGetTreeMenuList();
    const converted = convertToTreeFormat(result.data);
    setTreeData(converted);
    originalDataRef.current = JSON.parse(JSON.stringify(converted));
    setDeletedIdList(new Set());
  };

  const handleRightClick = (e, node = null) => {
    e.preventDefault();
    e.stopPropagation();
    if (node) {
      selectedNodeRef.current = node;
      setSelectedId(node.id);
    } else {
      selectedNodeRef.current = null;
      setSelectedId(null);
    }
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const addNode = () => {
    const newId = (idCounter++).toString();
    const parentNode = selectedNodeRef.current;

    const newNode = {
      id: newId,
      name: `새 항목 ${newId}`,
      url: "",
      ord: 0,
      useYn: "Y",
      componentFileNm: "",
      upperMenuNo: parentNode ? parentNode.data.menuNo ?? parentNode.id : null,
      isNew: true,
      children: [],
    };

    const copied = JSON.parse(JSON.stringify(treeData));
    if (!parentNode) {
      copied.push(newNode);
    } else {
      updateTree(copied, parentNode.id, (target) => {
        if (!target.children) target.children = [];
        target.children.push(newNode);
      });
    }

    setTreeData(copied);
    setContextMenu(null);
  };

  const deleteNode = () => {
    const targetId = selectedNodeRef.current?.id;
    if (!targetId) return;

    const deleteSet = new Set();
    collectIdsForDeletion(treeData, targetId, deleteSet);

    const deletedNodes = [];
    collectDeletedData(treeData, deleteSet, deletedNodes);

    deletedNodes.forEach((node) => {
      if (!node.isNew && node.menuNo) {
        deletedIdList.add(node.menuNo);
      }
    });

    setDeletedIdList(new Set(deletedIdList));

    const updated = deleteMultipleFromTree(JSON.parse(JSON.stringify(treeData)), deleteSet);
    setTreeData(updated);
    setSelectedId(null);
    selectedNodeRef.current = null;
    setContextMenu(null);
  };

  const updateNodeValue = (field, value) => {
    const node = selectedNodeRef.current;
    if (node) {
      node.data[field] = value;
      setTreeData([...treeData]);
    }
  };

  const saveMenu = () => {
    const updateList = [];
    const insertList = buildInsertListSorted(treeData);

    flattenTree(treeData, (node) => {
      if (!node.isNew) {
        const originalNode = findNodeById(originalDataRef.current, node.id);
        if (originalNode && hasChanged(originalNode, node)) {
          updateList.push(toDto(node));
        }
      }
    });

    const dto = {
      insertList,
      updateList,
      deleteIdList: Array.from(deletedIdList),
    };

    console.log("전송할 DTO", dto);

    menuMngService.fetcherSaveTreeMenuList(JSON.stringify(dto)).then((result) => {
      const isSaved = result.data;
      if (isSaved === "Y") alert("저장되었습니다.");
      getTreeMenuList();
    });
  };

  return (
    <div
      className={styles.wrapper}
      onContextMenu={(e) => {
        const clickedOnTreeNode = e.target.closest(`.${styles.itemContainer}`);
        if (!clickedOnTreeNode) handleRightClick(e, null);
      }}
    >
      <div className={styles.layoutContainer}>
        <div className={styles.container}>
          <h3 className={styles.title}>메뉴 목록</h3>
          <Tree
            data={treeData}
            openByDefault
            rowHeight={44}
            indent={20}
            className={styles.treeArea}
            children={({ node, style }) => {
              const isInternal = node.isInternal;
              return (
                <div
                  style={style}
                  className={`${styles.itemContainer} ${selectedId === node.id ? styles.selected : ""}`}
                  onContextMenu={(e) => handleRightClick(e, node)}
                  onClick={() => {
                    selectedNodeRef.current = node;
                    setSelectedId(node.id);
                  }}
                >
                  <div
                    className={styles.iconWrapper}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (node.isInternal) node.toggle();
                    }}
                  >
                    {isInternal && <span className={styles.branchMark}>ㄴ</span>}
                  </div>
                  <div className={styles.itemLabel}>{node.data.name}</div>
                </div>
              );
            }}
          />
          {contextMenu && (
            <div
              className={styles.contextMenu}
              style={{ top: contextMenu.y, left: contextMenu.x, position: "fixed" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.contextMenuItem} onClick={addNode}>＋ 추가</div>
              {selectedId && (
                <div className={styles.contextMenuItem} onClick={deleteNode}>🗑 삭제</div>
              )}
            </div>
          )}
        </div>

        <div className={styles.detailPanel}>
          <h3 className={styles.title}>상세 정보</h3>
          <div className={styles.detailCard}>
            <DetailInput label="메뉴명" value={selectedData?.name} onChange={(v) => updateNodeValue("name", v)} />
            <DetailInput label="매핑 URL" value={selectedData?.url} onChange={(v) => updateNodeValue("url", v)} />
            <DetailInput label="컴포넌트 파일명" value={selectedData?.componentFileNm} onChange={(v) => updateNodeValue("componentFileNm", v)} /> {/* (추가) */}
            <DetailInput label="정렬 순서" type="number" value={selectedData?.ord ?? ""} onChange={(v) => updateNodeValue("ord", Number(v))} />
            <div className={styles.detailRow}>
              <label>사용 여부</label>
              <select
                className={styles.detailInput}
                value={selectedData?.useYn || "Y"}
                onChange={(e) => updateNodeValue("useYn", e.target.value)}
              >
                <option value="Y">사용</option>
                <option value="N">미사용</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonFooter}>
        <button className={styles.saveButton} onClick={saveMenu}>저장</button>
      </div>
    </div>
  );
};

export default MenuList;

const DetailInput = ({ label, value, onChange, type = "text" }) => (
  <div className={styles.detailRow}>
    <label>{label}</label>
    <input className={styles.detailInput} type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} />
  </div>
);

// ===== 유틸 함수들 =====

function convertToTreeFormat(data) {
  return data.map((menu) => ({
    id: String(menu.menuNo),
    name: menu.menuNm,
    url: menu.url,
    ord: menu.ord,
    useYn: menu.useYn,
    componentFileNm: menu.componentFileNm || "", // (추가)
    menuNo: menu.menuNo,
    upperMenuNo: menu.upperMenuNo,
    children: menu.children ? convertToTreeFormat(menu.children) : [],
  }));
}

function updateTree(tree, targetId, callback) {
  for (let node of tree) {
    if (String(node.id) === String(targetId)) {
      callback(node);
      return true;
    }
    if (node.children) {
      const found = updateTree(node.children, targetId, callback);
      if (found) return true;
    }
  }
  return false;
}

function deleteMultipleFromTree(tree, idSet) {
  return tree
    .map((node) => {
      if (idSet.has(node.id)) return null;
      if (node.children) node.children = deleteMultipleFromTree(node.children, idSet);
      return node;
    })
    .filter(Boolean);
}

function collectIdsForDeletion(tree, targetId, idSet) {
  for (const node of tree) {
    if (node.id === targetId) {
      collectAllDescendantIds(node, idSet);
      idSet.add(node.id);
      return;
    }
    if (node.children) collectIdsForDeletion(node.children, targetId, idSet);
  }
}

function collectAllDescendantIds(node, idSet) {
  if (node.children) {
    for (const child of node.children) {
      idSet.add(child.id);
      collectAllDescendantIds(child, idSet);
    }
  }
}

function collectDeletedData(tree, idSet, list) {
  for (const node of tree) {
    if (idSet.has(node.id)) list.push(node);
    if (node.children) collectDeletedData(node.children, idSet, list);
  }
}

function flattenTree(tree, callback) {
  for (const node of tree) {
    callback(node);
    if (node.children) flattenTree(node.children, callback);
  }
}

function findNodeById(tree, id) {
  for (const node of tree) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function hasChanged(original, current) {
  return (
    original.name !== current.name ||
    original.url !== current.url ||
    original.ord !== current.ord ||
    original.useYn !== current.useYn ||
    original.componentFileNm !== current.componentFileNm // (추가)
  );
}

function toDto(node) {
  return {
    id: node.id,
    menuNo: node.menuNo || null,
    upperMenuNo: node.upperMenuNo || null,
    menuNm: node.name,
    url: node.url,
    ord: node.ord,
    useYn: node.useYn,
    componentFileNm: node.componentFileNm || "", // (추가)
  };
}

function buildInsertListSorted(tree, list = []) {
  for (const node of tree) {
    if (node.isNew) list.push(toDto(node));
    if (node.children) buildInsertListSorted(node.children, list);
  }
  return list;
}
