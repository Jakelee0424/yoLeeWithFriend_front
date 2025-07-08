import { Tree } from 'react-arborist';
import { useState, useRef } from "react";

import styles from "style/menu.module.css";

let idCounter = 1000;

const initialData = [
  {
    id: "1",
    name: "부문1",
    children: [
      {
        id: "1-1",
        name: "부서1",
        children: [
          { id: "1-1-1", name: "팀1" },
          { id: "1-1-2", name: "팀2" },
        ],
      },
      { id: "1-2", name: "부서2" },
    ],
  },
  { id: "2", name: "부문2" },
];

const MenuList = () => {
  // 메뉴 Tree 데이터
  const [treeData, setTreeData] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);
  // 마우스 우클릭 이벤트 설정을 위한 상태값 할당
  const [contextMenu, setContextMenu] = useState(null);
  // 노드 편집을 위한 변
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef();
  const selectedNodeRef = useRef(null);

  // 우클릭 이벤트로 추가, 삭제 할 수 있도록 커스터마이징
  const handleRightClick = (e, node) => {
    e.preventDefault();
    selectedNodeRef.current = node;
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // 노드 추가 이벤트
  const addNode = () => {
    const newId = (idCounter++).toString();
    const newNode = { id: newId, name: `새 항목 ${newId}` };
    const updated = [...treeData];

    if (!selectedNodeRef.current) {
      updated.push(newNode);
    } else {
      const node = selectedNodeRef.current;
      updateTree(updated, node.id, (target) => {
        if (!target.children) target.children = [];
        target.children.push(newNode);
      });
    }

    setTreeData(updated);
    setContextMenu(null);
  };

  // 노드 삭제 이벤트
  const deleteNode = () => {
    const targetId = selectedNodeRef.current.id;
    const updated = deleteFromTree([...treeData], targetId);
    setTreeData(updated);
    setContextMenu(null);
  };

  const handleMove = (nodes, parent, index) => {
    const movingIds = new Set(nodes.map((n) => n.id));
    let newTree = deleteMultipleFromTree([...treeData], movingIds);
    const parentId = parent?.id;

    newTree = updateTree(newTree, parentId, (target) => {
      if (!target.children) target.children = [];
      target.children.splice(index, 0, ...nodes.map((n) => n.data));
    });

    setTreeData(newTree);
  };

  // 편집모드로 전환
  const switchEditMode = (node) => {
    setEditId(node.id);
    setEditValue(node.data.name);
  };
  // 편집모드 종료
  const submitEditMode = (node) => {
    const newValue = inputRef.current?.value ?? node.data.name;

    const updated = updateTree([...treeData], node.id, (target) => {
      target.name = newValue;
    });

    setTreeData(updated);
    setEditId(null);
  };

  return (
    <div
      className={styles.container}
      onContextMenu={(e) => {
        if (!selectedNodeRef.current) {
          e.preventDefault();
          setContextMenu({ x: e.clientX, y: e.clientY });
        }
      }}
    >
      <Tree
        data={treeData}
        openByDefault
        rowHeight={40}
        dragAndDrop
        onMove={handleMove}
        className={styles.treeArea}
        children={({ node, style }) => {
          // const isOpen = node.isOpen;
          const isInternal = node.isInternal;

          return (
            <div
              style={style}
              className={`${styles.itemContainer} ${selectedId === node.id ? styles.selected : ""}`}
              onContextMenu={(e) => handleRightClick(e, node)}
              onClick={() => {
                selectedNodeRef.current = node;
                setSelectedId(node.id);
                node.toggle();
              }}
              onDoubleClick={() => switchEditMode(node)}
            >
              <div
                className={styles.iconWrapper}
                style={{ paddingLeft: node.level * 20 + 10 }}
              >
                {isInternal && node.level > 0 && (
                  <span className={styles.branchMark}>ㄴ</span>
                )}
              </div>
              <div className={styles.itemLabel}>
                {editId === node.id ? (
                    <input
                      ref={inputRef}
                      defaultValue={node.data.name}
                      autoFocus
                      onBlur={() => submitEditMode(node)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitEditMode(node);
                        if (e.key === "Escape") setEditId(null);
                      }}
                      style={{ width: "90%" }}
                    />
                ) : (
                  node.data.name
                )}
              </div>
            </div>
          );
        }}
      />

      {contextMenu && (
        <div
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x, position: "fixed" }}
          onClick={() => setContextMenu(null)}
        >
          <div className={styles.contextMenuItem} onClick={addNode}>＋ 추가</div>
          <div className={styles.contextMenuItem} onClick={deleteNode}>🗑 삭제</div>
        </div>
      )}
    </div>
  );
};

export default MenuList;

function updateTree(tree, targetId, callback) {
  for (let node of tree) {
    if (node.id === targetId) {
      callback(node);
      return tree;
    }
    if (node.children) {
      const result = updateTree(node.children, targetId, callback);
      if (result) return tree;
    }
  }
  return tree;
}

function deleteFromTree(tree, targetId) {
  return tree
    .map((node) => {
      if (node.id === targetId) return null;
      if (node.children) node.children = deleteFromTree(node.children, targetId);
      return node;
    })
    .filter(Boolean);
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