type NodesList = [string, number][];

// Входные параметры.
const TOWNS: string[] = [
    'A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'J', 'K'
];

const TARIFFS: string[] = [
    'A;B=1', 'A;D=5', 'B;C=2', 'B;E=2', 'C;K=7', 'D;H=7',
    'E;F=1', 'E;H=3', 'F;J=4', 'G;H=7', 'H;J=1', 'J;K=1'
];

const ROUTE: string = 'A;H';

// Функция.
function calcMinCost (towns: string[], tariffs: string[], route: string) {
    let G: Map<string, Array<[string, number]>> = new Map();

    for (let town of towns) {
        G.set(town, []);
    };
    for (let tariff of tariffs) {
        let [nodes, cost] = tariff.split('=');
        let [node1, node2] = nodes.split(';');
        G.get(node1).push([node2, +cost]);
        G.get(node2).push([node1, +cost]);
    };

    let dist: Map<string, number> = new Map();
    for (let key of G.keys()) {
        dist.set(key, Infinity);
    };
    let [start, finish] = route.split(';');
    dist.set(start, 0);
    let work: NodesList = [];
    work.push([start, 0]);
    let visited: string[] = [];
    let curNode: [string, number] | null = null;

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
let sss: number | undefined = calcMinCost(TOWNS, TARIFFS, ROUTE);
