import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table, Button, Input} from "reactstrap";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";
import { useLocation, useNavigate } from 'react-router-dom';
import bS from "style/basic.module.css"
import { Tree } from "react-arborist";
import styles from "style/menu.module.css";
import * as menuMngService from "service/admin/menu/menuMngService";


const LogMenuList = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const selectedNodeRef = useRef(null);
  const [contextMenu, setContextMenu] = useState(null);
  const originalDataRef = useRef([]);
  const [deletedIdList, setDeletedIdList] = useState(new Set());

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

  const getTreeMenuList = async () => {
    const result = await menuMngService.fetcherGetTreeMenuList();
    const converted = convertToTreeFormat(result.data);
    setTreeData(converted);
    originalDataRef.current = JSON.parse(JSON.stringify(converted));
    setDeletedIdList(new Set());
  };

  useEffect(() => {
    
  },[])

  useEffect(() => {
    getTreeMenuList();
  }, []);
  

  return (
    <div style={{display:"flex", width:"100%", alignContent:"center", marginTop:"1%"}}>
      <Card style={{width:"100%"}}>
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
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
        </CardBody>
      </Card>
    </div>
  );
};

export default LogMenuList;

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