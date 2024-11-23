// Auto-generated types
export type Requirements = {
  power?: number;
  crew?: number;
  slots?: number;
};

export type FactionTrait = {
  symbol: string;
  name: string;
  description: string;
};

export type WaypointLocation = {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
};

export type Route = {
  origin: WaypointLocation;
  destination: WaypointLocation;
  arrival: string;
  departureTime: string;
};

export type DeliveryItem = {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
};

export type ContractTerms = {
  deadline: string;
  payment: {
    onAccepted: number;
    onFulfilled: number;
  };
  deliver: DeliveryItem[];
};

export type Mount = {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  deposits?: string[];
  requirements: Requirements;
};

export type Module = {
  symbol: string;
  name: string;
  description: string;
  capacity?: number;
  requirements: Requirements;
};

export type ShipRegistration = {
  name: string;
  factionSymbol: string;
  role: string;
};

export type ShipCargo = {
  capacity: number;
  units: number;
  inventory: unknown[];
};

export type ShipFrame = {
  symbol: string;
  name: string;
  description: string;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  condition: number;
  integrity: number;
  requirements: Requirements;
};

export type ShipReactor = {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  powerOutput: number;
  requirements: Requirements;
};

export type ShipEngine = {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  speed: number;
  requirements: Requirements;
};

export type ShipCooldown = {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
};

export type ShipFuel = {
  current: number;
  capacity: number;
  consumed: {
    amount: number;
    timestamp: string;
  };
};

export type ShipCrew = {
  current: number;
  capacity: number;
  required: number;
  rotation: string;
  morale: number;
  wages: number;
};

export type ShipNav = {
  systemSymbol: string;
  waypointSymbol: string;
  route: Route;
  status: string;
  flightMode: string;
};

export type Ship = {
  symbol: string;
  nav: ShipNav;
  crew: ShipCrew;
  fuel: ShipFuel;
  cooldown: ShipCooldown;
  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;
  modules: Module[];
  mounts: Mount[];
  registration: ShipRegistration;
  cargo: ShipCargo;
};

export type Agent = {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
};

export type Contract = {
  id: string;
  factionSymbol: string;
  type: string;
  terms: ContractTerms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: string;
  deadlineToAccept: string;
};

export type Faction = {
  symbol: string;
  name: string;
  description: string;
  headquarters: string;
  traits: FactionTrait[];
  isRecruiting: boolean;
};

export type RegisterResponse = {
  data: {
    token: string;
    agent: Agent;
    contract: Contract;
    faction: Faction;
    ship: Ship;
  };
};