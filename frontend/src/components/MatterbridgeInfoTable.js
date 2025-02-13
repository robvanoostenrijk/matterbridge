// Frontend
import { TruncatedText } from './TruncatedText';
// import { debug } from '../App';
const debug = true;

// This function takes systemInfo as a parameter and returns a table element with the systemInfo
export function MatterbridgeInfoTable({ matterbridgeInfo }) {
  if(debug) console.log('MatterbridgeInfoTable:', matterbridgeInfo);

  const excludeKeys = ['matterbridgeVersion', 'matterbridgeLatestVersion', 'matterFileLogger', 'fileLogger', 'matterLoggerLevel', 'loggerLevel',
    'bridgeMode', 'restartMode', 'matterbridgeFabricInformations', 'matterbridgeSessionInformations', 'restartRequired', 'refreshRequired', 'matterbridgeQrPairingCode', 'matterbridgeManualPairingCode',
    'mattermdnsinterface', 'matteripv4address', 'matteripv6address', 'matterbridgePaired', 'matterbridgeConnected', 'readOnly', 'matterPort', 'matterDiscriminator', 'matterPasscode'];
  if (matterbridgeInfo.bridgeMode === 'childbridge') excludeKeys.push('matterbridgePaired');

  return (
    <div className="MbfWindowDiv" style={{ minWidth: '302px' }}>
      <div className="MbfWindowDivTable">
        <table>
          <thead>
            <tr>
              <th colSpan="2">Matterbridge Information</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(matterbridgeInfo)
              .filter(([key, value]) => !excludeKeys.includes(key) && value !== undefined && value !== '')
              .map(([key, value], index) => (
                <tr key={key} className={index % 2 === 0 ? 'table-content-even' : 'table-content-odd'} style={{ borderTop: '1px solid #ddd' }}>
                  <td>{key.replace('matterbridgePaired', 'paired').replace('homeDirectory', 'home').replace('rootDirectory', 'root').replace('matterbridgeDirectory', 'storage').replace('matterbridgePluginDirectory', 'plugins').replace('globalModulesDirectory', 'modules')}</td>
                  <td>
                    <TruncatedText value={typeof value !== 'string' ? value.toString() : value} maxChars={28} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
