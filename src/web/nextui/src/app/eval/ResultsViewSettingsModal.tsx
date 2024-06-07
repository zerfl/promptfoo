import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useStore as useResultsViewStore } from './store';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const {
    maxTextLength,
    setMaxTextLength,
    wordBreak,
    setWordBreak,
    showInferenceDetails,
    setShowInferenceDetails,
    renderMarkdown,
    setRenderMarkdown,
    prettifyJson,
    setPrettifyJson,
    showPrompts,
    setShowPrompts,
    jsonExtractField,
    setJsonExtractField,
  } = useResultsViewStore();
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Table View Settings</DialogTitle>
      <DialogContent>
        <Box>
          <Tooltip title="Forcing line breaks makes it easier to adjust column widths to your liking">
            <FormControlLabel
              control={
                <Checkbox
                  checked={wordBreak === 'break-all'}
                  onChange={(e) => setWordBreak(e.target.checked ? 'break-all' : 'break-word')}
                />
              }
              label="Force line breaks"
            />
          </Tooltip>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={renderMarkdown}
                onChange={(e) => setRenderMarkdown(e.target.checked)}
              />
            }
            label="Render model outputs as Markdown"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={prettifyJson}
                onChange={(e) => setPrettifyJson(e.target.checked)}
              />
            }
            label="Prettify JSON outputs"
          />
          <FormControl>
            <InputLabel htmlFor="extract-field" size="small">
              Extract field from JSON
            </InputLabel>
            <OutlinedInput
              id="extract-field"
              label="Extract field from JSON"
              size="small"
              value={jsonExtractField || ''}
              onChange={(e) => setJsonExtractField(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <Tooltip title="Show the final prompt that produced the output in each cell.">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPrompts}
                  onChange={(e) => setShowPrompts(e.target.checked)}
                />
              }
              label="Show full prompt in output cell"
            />
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Show detailed inference statistics such as latency, tokens used, cost, etc.">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showInferenceDetails}
                  onChange={(e) => setShowInferenceDetails(e.target.checked)}
                />
              }
              label="Show inference details"
            />
          </Tooltip>
        </Box>
        <Box maxWidth="sm">
          <Typography mt={2}>Max text length: {maxTextLength}</Typography>
          <Slider
            min={25}
            max={1000}
            value={maxTextLength}
            onChange={(_, val: number | number[]) => setMaxTextLength(val as number)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsModal;
