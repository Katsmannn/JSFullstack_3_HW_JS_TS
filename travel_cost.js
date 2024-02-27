// Входные параметры.
const TOWNS = [
    'A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'J', 'K'
];

const TARIFFS = [
    'A;B=1', 'A;D=5', 'B;C=2', 'B;E=2', 'C;K=7', 'D;H=7',
    'E;F=1', 'E;H=3', 'F;J=4', 'G;H=7', 'H;J=1', 'J;K=1'
];

const ROUTE = 'A;H';

// Функция.
function calcMinCost (towns, tariffs, route) {
    let G = new Map();

    for (let town of towns) {
        G.set(town, []);
    };
    for (let tariff of tariffs) {
        let [nodes, cost] = tariff.split('=');
        let [node1, node2] = nodes.split(';');
        G.get(node1).push([node2, +cost]);
        G.get(node2).push([node1, +cost]);
    };

    for (let key of G.keys()) {
        dist.set(key, Infinity);
    };
    let [start, finish] = route.split(';');
    let dist = new Map();
    dist.set(start, 0);
    let work = [];
    work.push([start, 0]);
    let visited = [];
    let curNode = null;

    while (work.length > 0) {
        work.sort((a, b) => b[1] - a[1]);
        curNode = work.pop();
        for (let child of G.get(curNode[0])) {
            if (
                !(visited.includes(child[0])) &&
                (dist.get(child[0]) > dist.get(curNode[0]) + child[1])
            ) {
                dist.set(child[0], dist.get(curNode[0]) + child[1]);
            };

            if (!(visited.includes(child[0]))) {
                work.push(child);
            };
        };
        visited.push(curNode[0]);
    };
    let minCost = dist.get(finish);
    if (minCost && minCost < Infinity) {
        return minCost;
    }
};

// Проверка работы функции.
let sss = calcMinCost(TOWNS, TARIFFS, ROUTE);
